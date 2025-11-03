import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, isEmpty } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom"; // ⬅️ for reading query params
import PageTitle from "../common/pageTitle";
import { getLearningContentAction } from "../../redux/action/learningAction";
import SignDetails from "./signDetails";
import CameraSection from "../common/camera/cameraSection";
import { analyzeSignPose } from "../Test/signDetection";
import { LearnPageUrl } from "../../constant";
import Loading from "../loading";

const Learn = () => {
  const dispatch = useDispatch();
  const { learningContent: contentFromStore, loading } = useSelector(
    (state) => state.learning
  );
  const [learningContent, setLearningContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [searchParams] = useSearchParams();
  const idFromUrl = searchParams.get("id") || 1;
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getLearningContentAction());
  }, [dispatch]);

  useEffect(() => {
    const content = !isEmpty(contentFromStore) ? contentFromStore : [];
    setLearningContent(content);
    if (content?.length > 0) {
      const index = content?.findIndex((item) => item?.sign_id === idFromUrl);
      setCurrentIndex(index !== -1 ? index : 0);
      window.history.replaceState(null, "", LearnPageUrl);
      setCameraActive(false);
      setTimeout(() => setCameraActive(true), 300);
    }
  }, [contentFromStore, idFromUrl]);


  const currentSign = learningContent?.[currentIndex] || {};

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis?.cancel();
    speechSynthesis?.speak(utterance);
  };


  const handleSave = async (img) => {
    try {
      setIsProcessing(true);
      setFeedback("");
      const capturedImage = img;
      if (!capturedImage) {
        setFeedback("⚠️ Unable to capture image!");
        return;
      }
      console.log(currentSign,'currentSign')
      const response = await analyzeSignPose(currentSign?.image_path, capturedImage);
      console.log(response)
      const{ isCorrect, score }=response
      if (isCorrect) {
        setIsCorrect(true);
        speak(`Good job! You performed ${currentSign?.name} correctly.`);
        setFeedback("✅ Correct sign! Great job!");
      } else {
        setIsCorrect(false);
        speak(`That’s not quite right. Try again.`);
        setFeedback("❌ Not matched. Please practice again.");
      }
    } catch (err) {
      console.error(err);
      setFeedback("Error analyzing pose.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % learningContent?.length);
    setIsCorrect(false);
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white py-4 px-4">
      {loading && <Loading />}
      <div className="container mx-auto">
        <PageTitle
          title="Learn ASL Signs 👋"
          description="Practice and master American Sign Language with real-time camera feedback."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SignDetails sign={currentSign} />

          <div>
            <CameraSection
              currentIndex={currentIndex}
              total={learningContent?.length}
              cameraActive={cameraActive}
              setCameraActive={setCameraActive}
              onCapture={(img) => handleSave(img)}
              loading={loading||isProcessing}
              handleNext={handleNext}
              isProcessing={isProcessing}
              isCorrect={isCorrect}
            />

            {feedback && (
              <p
                className={`mt-4 font-semibold text-center ${isCorrect ? "text-green-500" : "text-red-500"
                  }`}
              >
                {feedback}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
