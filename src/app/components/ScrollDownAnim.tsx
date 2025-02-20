import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";

const ScrollDownAnim = () => {
  return (
    <div className="w-10 h-10 ">
      <motion.div
        className="w-8 h-20 relative top-2 left-1 flex flex-col items-center"
        animate={{
          y: [0, 10, 10, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeOut",
        }}
      >
        <FaAngleDown className="text-[#72edff]" />
        <FaAngleDown className=" text-[#50c878]" />
        <FaAngleDown className="text-[white] w-30" />
      </motion.div>
    </div>
  );
};

export default ScrollDownAnim;
