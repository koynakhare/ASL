import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let handLandmarker = null;

export const initHandModel = async () => {
  if (handLandmarker) return handLandmarker;
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task",
    },
    runningMode: "IMAGE",
    numHands: 1,
  });
  return handLandmarker;
};

const toBase64 = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);

    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("❌ toBase64 error:", error);
    throw new Error("Unable to load image. Please check your connection.");
  }
};

const detectHandLandmarks = async (model, imageSrc) => {
  try {
    let img = new Image();
    if (imageSrc?.startsWith("http")) {
      const base64 = await toBase64(imageSrc);
      if (!base64) throw new Error("Invalid base64 data.");
      img.src = base64;
    } else {
      img.src = imageSrc;
    }

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error("Failed to load image."));
    });

    const results = await model.detect(img);
    return results?.landmarks || [];
  } catch (error) {
    console.error("❌ detectHandLandmarks error:", error);
    throw new Error("Error loading image. Please try again.");
  }
};

export const analyzeSignPose = async (referenceImg, userImg) => {
  try {
    const model = await initHandModel();
    const ref = await detectHandLandmarks(model, referenceImg);
    const user = await detectHandLandmarks(model, userImg);
    if (!ref?.length || !user?.length) {
      console.warn("⚠️ Hand not detected, returning incorrect result.");
      return { isCorrect: false, score: 0 };
    }

    const dist = averageDistance(ref[0], user[0]);
    const normalizedScore = Math.max(0, 100 - dist * 50);
    const isCorrect = normalizedScore >= 70;

    console.log("📏 Distance:", dist.toFixed(2), "| Score:", normalizedScore.toFixed(1));
    return { isCorrect, score: Math.round(normalizedScore) };
  } catch (err) {
    console.error("❌ Pose analysis failed:", err);
    return { isCorrect: false, score: 0, error: err.message || "Image processing failed." };
  }
};

const averageDistance = (a, b) => {
  if (!a || !b || a.length !== b.length) return Infinity;
  let total = 0;
  for (let i = 0; i < a.length; i++) {
    const dx = a[i].x - b[i].x;
    const dy = a[i].y - b[i].y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  return total / a.length;
};
