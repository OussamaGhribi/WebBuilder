import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GetStarted = () => {
  const navigate = useNavigate();

  const handleDragDropClick = () => {
    navigate("/drag-drop");
  };

  const handlePromptMethodClick = () => {
    navigate("/prompt-method");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 overflow-hidden flex items-center justify-center p-6">
      {/* Background Animated Blobs */}
      {/* Blob 1 */}
      <motion.div
        className="absolute bg-pink-400 opacity-30 w-80 h-80 rounded-full top-[-100px] left-[-100px] z-0"
        animate={{
          x: [0, 50, 0], // Moves horizontally
          y: [0, 50, 0], // Moves vertically
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute bg-blue-400 opacity-30 w-80 h-80 rounded-full bottom-[-100px] right-[-100px] z-0"
        animate={{
          x: [0, -50, 0], // Moves horizontally in the opposite direction
          y: [0, -50, 0], // Moves vertically in the opposite direction
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className="absolute bg-red-600 opacity-30 w-96 h-96 rounded-full top-[200px] right-[200px] z-0"
        animate={{
          x: [0, 30, 0], // Moves horizontally
          y: [0, -60, 0], // Moves vertically
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 4 */}
      <motion.div
        className="absolute bg-orange-400 opacity-30 w-72 h-72 rounded-full bottom-[150px] left-[250px] z-0"
        animate={{
          x: [0, -70, 0], // Moves horizontally
          y: [0, 20, 0], // Moves vertically
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 5 */}
      <motion.div
        className="absolute bg-green-300 opacity-30 w-72 h-72 rounded-full top-[200px] left-[350px] z-0"
        animate={{
          x: [0, 40, 0], // Moves horizontally
          y: [0, -40, 0], // Moves vertically
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 mb-6">
          Build Your Dream Website
        </h1>
        <p className="text-lg sm:text-2xl text-gray-600 mb-12">
          Choose your preferred creation method
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDragDropClick}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl transition-all cursor-pointer"
          >
            Drag & Drop Method
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePromptMethodClick}
            className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-xl transition-all cursor-pointer"
          >
            Prompt Method
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default GetStarted;
