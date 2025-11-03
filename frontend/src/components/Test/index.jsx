import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import PageTitle from "../common/pageTitle";
import { submitTestAction } from "../../redux/action/testAction";
import ProgressBar from "./progressBar";
import TestCompleted from "./testCompleted";
import CameraSection from "../common/camera/cameraSection";
import { analyzeSignPose } from "./signDetection";
import { notification } from "../../utils/helper";
import { getLearningContentAction } from "../../redux/action/learningAction";
import Loading from "../loading";
import SignDetails from "../Learn/signDetails";

const Test = () => {
  const dispatch = useDispatch();
  const { learningContent: questionsFromStore, loading } = useSelector((state) => state.learning);
  const { loading:testLoading } = useSelector((state) => state.test);
  const [detecting, setDetecting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState([]);
  const [finalResult, setFinalResults] = useState([]);
  const [testDone, setTestDone] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImages, setCapturedImages] = useState({});

  useEffect(() => {
    dispatch(getLearningContentAction());
  }, []);

  useEffect(() => {
    const validQuestions = get(questionsFromStore, "length", 0)
      ? questionsFromStore
      : [];
    setQuestions(validQuestions);
  }, [questionsFromStore]);

  useEffect(() => {
    if (questions?.length > 0) {
      setCameraActive(true);
      setStartTime(Date.now());
    }
  }, [questions]);

  const currentQ = questions?.[current];
  const progress = ((current + 1) / (questions?.length || 1)) * 100;

  const handleCapture = (img) => {
    setCapturedImages((prev) => ({
      ...prev,
      [currentQ?.sign_id]: img,
    }));
  };

  const markAnswer = (isCorrect, score) => {
    setResults((prev) => {
      const filtered = prev?.filter((r) => r?.sign_id !== currentQ?.sign_id);
      return [
        ...filtered,
        {
          sign_id: currentQ?.sign_id,
          name: currentQ?.name,
          correct: isCorrect,
          status: isCorrect ? "correct" : "incorrect",
          score,
          capturedImage: capturedImages?.[currentQ?.sign_id],
          referenceImg: currentQ?.image_path,
        },
      ];
    });
  };

  const nextQuestion = async () => {
    if (!currentQ || !capturedImages?.[currentQ?.sign_id]) {
      dispatch(notification(false, "Please capture your sign before continuing!", true));
      return;
    }

    try {
      setDetecting(true);

      const capturedImg = capturedImages?.[currentQ?.sign_id];
      const referenceImg = currentQ?.image_path;

      const { isCorrect, score, error } = await analyzeSignPose(referenceImg, capturedImg);
      markAnswer(isCorrect, score);
      if (!error) {
        if (current < questions?.length - 1) {
          setCurrent((prev) => prev + 1);
        } else {
          setTestDone(true);
        }
      } else {
        dispatch(notification(false, error, true))
      }
    } catch (error) {
      setDetecting(false);
      console.error("❌ Error during sign analysis:", error);
      dispatch(notification(false, "Error analyzing sign. Please try again.", true));
    } finally {
      setDetecting(false);
    }
  };

  const submitTest = async () => {
    const updatedResults = [...results];

    // Include the last captured question if not analyzed yet
    if (currentQ && capturedImages?.[currentQ?.sign_id]) {
      const capturedImg = capturedImages?.[currentQ?.sign_id];
      const referenceImg = currentQ?.image_path;
      const { isCorrect, score } = await analyzeSignPose(referenceImg, capturedImg);
      updatedResults.push({
        sign_id: currentQ?.sign_id,
        name: currentQ?.name,
        correct: isCorrect,
        status: isCorrect ? "correct" : "incorrect",
        score,
        capturedImage: capturedImg,
        referenceImg: referenceImg,
      });
    }
    const total = updatedResults?.length;
    const correctCount = updatedResults?.filter((r) => r?.correct)?.length;
    const totalScore = updatedResults?.reduce((sum, r) => sum + r?.score, 0);
    const avgScore = total ? Math.round(totalScore / total) : 0;
    const percentage = total ? Math.round((correctCount / total) * 100) : 0;
    const sortedResults = updatedResults?.sort((a, b) => b.score - a.score);
    const end = Date.now();
    const durationMs = end - (startTime || end);
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    const timeTaken = `${minutes}m ${seconds}s`;
    const updatedFinalResult = {
      total,
      score: correctCount,
      averageScore: avgScore,
      percentage,
      data: sortedResults,
      timeTaken
    };

    const payload = {
      results: sortedResults?.map((res) => ({
        sign_id: res?.sign_id,
        score: res?.score,
        is_correct: res?.correct,
      })),
    };

    const response = await dispatch(submitTestAction(payload));
console.log(updatedFinalResult,'updatedFinalResult')

    if (response?.payload?.success) {
      setResults(updatedResults);
      setFinalResults(updatedFinalResult);
      setTestDone(true);
    } else {
      dispatch(notification(false, "Failed to submit test", true));
    }
  };
console.log(finalResult,'finalResult')
  if (testDone) {
    return (
      <TestCompleted
        results={finalResult}
        total={questions?.length}
        onRetake={() => {
          setCurrent(0);
          setResults([]);
          setCapturedImages({});
          setTestDone(false);
          setCameraActive(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white py-1 px-4">
      {loading || detecting || testLoading && <Loading />}

      <div className="container mx-auto">
        <PageTitle
          title="ASL Test Mode 🧠"
          description="Perform the sign shown below — your camera will detect if it’s correct!"
        />

        <ProgressBar
          current={current}
          total={questions?.length}
          progress={progress}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <SignDetails sign={currentQ} isTestPage={true} />

          </div>

          <CameraSection
            currentIndex={current}
            total={questions?.length}
            cameraActive={cameraActive}
            setCameraActive={setCameraActive}
            handleNext={nextQuestion}
            onCapture={handleCapture}
            loading={loading || detecting || testLoading}
            isLast={current === questions?.length - 1}
            onSubmit={submitTest}
          />

        </div>
      </div>
    </div>
  );
};

export default Test;
