import React from "react";
import CameraFeed from "./index";

const CameraSection = ({
  currentIndex,
  total,
  cameraActive,
  setCameraActive,
  onSave,
  handleNext,
  onPracticeAgain,
  loading,
  onCapture,
  isLast,
  onSubmit,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center">
      <CameraFeed
        height="h-[300px]"
        cameraActive={cameraActive}
        setCameraActive={setCameraActive}
        loading={loading}
        currentIndex={currentIndex}
        onCapture={onCapture}
      />

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {[
          {
            label: cameraActive ? "Stop Camera" : "Start Camera",
            onClick: () => setCameraActive((prev) => !prev),
          },
          onPracticeAgain && {
            label: "Practice Again",
            onClick: onPracticeAgain,
          },
          onPracticeAgain && {
            label: "Submit",
            onClick: onSave,
          },
          isLast
            ? {
              label: "Submit Test",
              onClick: onSubmit,
              className: "bg-green-600",
            }
            : {
              label: "Next →",
              onClick: handleNext,
              className: "bg-primary",
            },
        ]
          .filter(Boolean)
          .map(({ label, onClick, className = "bg-gray-600" }, i) => (
            <button
              key={i}
              onClick={onClick}
              disabled={loading}
              className={`${className} text-white px-6 py-2 rounded-full hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {label}
            </button>
          ))}
      </div>

      <p className="mt-4 text-sm text-gray-400">
        {currentIndex + 1} / {total} signs
      </p>
    </div>
  );
};

export default CameraSection;
