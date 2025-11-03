import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomImage from "../common/image";
import { capitalizeFirstLetter } from "../../utils/helper";
import Vector from "../../assets/website/blue-pattern.png"; // decorative bg
import Hello from '../../assets/sign/hello.png'
import thankyou from '../../assets/sign/thankyou.jpg'
import GoodMorning from '../../assets/sign/goodmorning.jpg'
import { useNavigate } from "react-router-dom";
import { LearnPageUrl } from "../../constant";

const dummyContent = [
  {
    sign_id: 1,
    name: "Hello",
    instruction: "Raise your hand and wave gently.",
    image_path: Hello,
  },
  {
    sign_id: 2,
    name: "Thank You",
    instruction: "Touch your chin with fingers then move hand forward.",
    image_path: thankyou,
  },
  {
    sign_id: 3,
    name: "Good Morning",
    instruction: "Lift your hand and form a gentle wave from chest outward.",
    image_path: GoodMorning,
  },
];

const Hero = () => {
  const [currentSign, setCurrentSign] = useState(1);

  const { image_path, name, instruction, sign_id } =
    dummyContent.find((item) => item.sign_id === currentSign) || {};
  const navigate = useNavigate()

  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  };

  return (
    <div
      className="min-h-[650px] bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 
      flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 relative overflow-hidden"
      style={bgImage}
    >
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* ===== LEFT SECTION ===== */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center gap-6 order-2 sm:order-1 text-center sm:text-left"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 leading-tight">
            Learn Sign Language <br />
            <span className="text-blue-500">with Visual Guidance</span>
          </h1>

          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-md mx-auto sm:mx-0">
            {capitalizeFirstLetter(instruction)}
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(LearnPageUrl)}
            className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white 
            font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 w-fit mx-auto sm:mx-0"
          >
            Start Learning
          </motion.button>
        </motion.div>

        {/* ===== RIGHT SECTION ===== */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-6 relative order-1 sm:order-2"
        >
          <div className="relative flex justify-center items-center w-[300px] sm:w-[400px] h-[300px] sm:h-[400px]">
            <motion.div
              className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-70"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            ></motion.div>

            <CustomImage
              src={image_path}
              alt={name}
              className="w-full h-full object-contain z-10 rounded-2xl shadow-2xl border-4 border-white"
            />
          </div>

          {/* Thumbnail selection */}
          <div className="flex gap-4 justify-center mt-4">
            {dummyContent.map((item) => (
              <motion.div
                key={item.sign_id}
                whileHover={{ scale: 1.1 }}
                className={`cursor-pointer rounded-xl overflow-hidden border-2 ${currentSign === item.sign_id
                  ? "border-blue-500"
                  : "border-transparent"
                  }`}
                onClick={() => setCurrentSign(item.sign_id)}
              >
                <CustomImage
                  src={item.image_path}
                  alt={item.name}
                  className="w-[90px] h-[90px] object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
