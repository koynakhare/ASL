import React from "react";
import CustomImage from "../common/image";
import { capitalizeFirstLetter } from "../../utils/helper";

const QuestionCard = ({ question }) => {
  if (!question) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex justify-center items-center h-[350px]">
        <p className="text-gray-400">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
      <CustomImage
        src={question?.image_path}
        alt={question?.name}
        className="w-[250px] h-[250px] object-contain mx-auto mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">{capitalizeFirstLetter(question?.name)}</h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {question?.instruction}
      </p>
    </div>
  );
};

export default QuestionCard;
