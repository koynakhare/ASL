import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "../../../utils/helper";

const CameraFeed = ({
  cameraActive,
  setCameraActive,
  onCapture,
  height,
  loading,
  currentIndex,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const dispatch = useDispatch();
  const [capturedImage, setCapturedImage] = useState(null);
  const [countdown, setCountdown] = useState(null);
  useEffect(() => {
    setCapturedImage(null);
    if (cameraActive) {
      setTimeout(() => {
        if (videoRef.current) startCamera();
      }, 100); // small delay ensures <video> is mounted
    }
    return () => stopCamera();
  }, [cameraActive, currentIndex]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Camera error:", err);
      let message = "Please allow camera access!";
      dispatch(notification(false, message, true));
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      console.warn("Video not ready yet!");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Flip horizontally (mirror)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    onCapture(imageData);
  };

  const handleCountdownAndCapture = () => {
    let counter = 3;
    setCountdown(counter);

    const timer = setInterval(() => {
      counter -= 1;
      if (counter > 0) {
        setCountdown(counter);
      } else {
        clearInterval(timer);
        setCountdown(null);
        captureImage(); // auto capture after countdown
      }
    }, 1000);
  };

  const handleRetake = async () => {
    setCapturedImage(null);
    onCapture(null);
    await startCamera();
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Video Feed */}
      {cameraActive && !capturedImage && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`rounded-xl border-4 border-gray-300 ${height}`}
        />
      )}

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
          <p className="text-white text-6xl font-bold animate-pulse">
            {countdown}
          </p>
        </div>
      )}

      {!cameraActive && (
        <p className="text-gray-400">Start camera to capture image</p>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* Captured Image */}
      {capturedImage && (
        <div className="flex flex-col items-center mt-3">
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded-xl border-4 border-green-400 w-80 shadow-md"
          />
          <p className="text-green-600 mt-2 font-medium">
            Captured successfully ✅
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-3 flex gap-3">
        {!capturedImage && cameraActive ? (
          <button
            onClick={handleCountdownAndCapture}
            disabled={countdown !== null || loading}
            className={`bg-blue-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform ${countdown !== null || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            📸 Start Capture (4s)
          </button>
        ) : (
          cameraActive && (
            <button
              disabled={countdown !== null || loading}
              onClick={handleRetake}
              className={`bg-yellow-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform${countdown !== null || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              🔄 Retake Image
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CameraFeed;
