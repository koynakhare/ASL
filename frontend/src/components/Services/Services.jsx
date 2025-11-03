import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { get } from "lodash";
import CustomImage from "../common/image";
import Loading from "../loading";
import { capitalizeFirstLetter } from "../../utils/helper";
import { LearnPageUrl } from "../../constant";
import { getLearningContentAction } from "../../redux/action/learningAction";

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getLearningContentAction())
  },[])

  const { learningContent: contentFromStore, loading } = useSelector(
    (state) => state.learning
  );

  const [learningContent, setLearningContent] = useState([]);

  useEffect(() => {
    const content = get(contentFromStore, "length", 0) ? contentFromStore : [];
    setLearningContent(content);
  }, [contentFromStore]);

  return (
    <>
      <span id="services"></span>
      {loading && <Loading />}

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Start Learning Today
            </p>
            <h1 className="text-3xl font-bold">Popular ASL Signs</h1>
            <p className="text-xs text-gray-400">
              Explore some of the most common American Sign Language gestures
              and practice them interactively.
            </p>
          </div>

          {/* ===== Sign Cards ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center">
            {learningContent?.slice(0, 3)?.map((sign, index) => (
              <motion.div
                key={sign.sign_id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl 
                overflow-hidden group hover:shadow-2xl hover:-translate-y-2 
                transition-all duration-300 max-w-[300px]"
              >
                {/* Image Section */}
                <div className="h-[160px] flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600">
                  <CustomImage
                    src={sign.image_path}
                    alt={sign.name}
                    className="w-[120px] h-[120px] object-cover rounded-xl group-hover:scale-110 duration-300"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {capitalizeFirstLetter(sign.name)}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                    {capitalizeFirstLetter(sign.instruction)}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(LearnPageUrl)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white 
                    py-2 px-5 rounded-full shadow-md hover:shadow-lg transition duration-300"
                  >
                    Practice Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
