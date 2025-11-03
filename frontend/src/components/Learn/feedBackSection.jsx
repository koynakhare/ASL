import React from "react";
import { FaHandPaper } from "react-icons/fa";

const FeedbackSection = () => (
  <div className="mt-6 text-center">
    <h3 className="text-lg font-semibold mb-1">Feedback</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Perform the sign in front of your camera to see your accuracy.
    </p>

    <div className="mt-3 flex justify-center items-center gap-2">
      <FaHandPaper className="text-green-500 text-2xl" />
      <span className="font-medium text-green-600 dark:text-green-400">
        Matching: 85%
      </span>
    </div>
  </div>
);

export default FeedbackSection;
