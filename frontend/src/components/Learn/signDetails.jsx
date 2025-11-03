import React, { useState } from "react";
import { FaLightbulb, FaVolumeUp, FaPause, FaHandSparkles } from "react-icons/fa";
import CustomImage from "../common/image";
import { capitalizeFirstLetter } from "../../utils/helper";

const SignDetails = ({ sign, isTestPage }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  if (!sign?.name) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center h-[400px]">
        <p className="text-gray-500 dark:text-gray-400">Loading sign...</p>
      </div>
    );
  }

  // 🗣️ Handle speech actions
  const handleSpeech = () => {
    if (!sign?.instruction) return;

    // 🔹 If speech is paused → resume
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    // 🔹 If currently speaking → pause
    if (isSpeaking) {
      speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    // 🔹 Otherwise → start new speech
    const newUtterance = new SpeechSynthesisUtterance(sign.instruction);
    newUtterance.lang = "en-US";
    newUtterance.rate = 1;
    newUtterance.pitch = 1;

    newUtterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setUtterance(null);
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(newUtterance);
    setUtterance(newUtterance);
    setIsSpeaking(true);
  };

  return (
    <div
      className={`relative rounded-2xl shadow-xl flex flex-col items-center justify-center transition-all duration-300 ${
        isTestPage
          ? "bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 border border-blue-100 dark:border-gray-700"
          : "bg-white dark:bg-gray-800 p-4"
      }`}
    >
      {/* 🔊 Volume / Pause Button */}
      <button
        onClick={handleSpeech}
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition"
        title={isPaused ? "Resume" : isSpeaking ? "Pause" : "Play Instruction"}
      >
        {isSpeaking && !isPaused ? <FaPause size={18} /> : <FaVolumeUp size={18} />}
      </button>

      {/* 🧠 Learn Page */}
      {!isTestPage && (
        <>
          <CustomImage
            src={sign?.image_path}
            alt={sign?.name}
            className="w-[250px] h-[250px] object-contain mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">
            Sign: “{capitalizeFirstLetter(sign?.name)}”
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-3 px-2">
            {capitalizeFirstLetter(sign?.meaning)}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-3 px-2">
            <strong>Hint:</strong> {capitalizeFirstLetter(sign?.usage)}
          </p>
          <div className="mt-4 text-sm flex items-center gap-2 bg-blue-50 dark:bg-gray-700 py-2 px-4 rounded-full">
            <FaLightbulb className="text-yellow-500" />
            <span>{capitalizeFirstLetter(sign?.instruction)}</span>
          </div>
        </>
      )}

      {/* 🧩 Test Page */}
      {isTestPage && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FaHandSparkles className="text-blue-600 text-2xl" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {capitalizeFirstLetter(sign?.name)}
            </h2>
          </div>

          <div className="mt-3 bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-xl shadow-sm inline-flex items-center gap-2">
            <FaLightbulb className="text-yellow-500" />
            <p className="text-sm font-medium">
              {capitalizeFirstLetter(sign?.usage)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignDetails;
