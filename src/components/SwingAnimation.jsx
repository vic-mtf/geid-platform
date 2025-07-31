import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function SwingAnimation({ delay = 0, onFinish, children }) {
  const variants = {
    hidden: { rotate: 0 },
    swing: {
      rotate: [0, 30, -20, 10, -10, 0],
      transition: {
        duration: 0.8,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        loop: Infinity,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='swing'
      onAnimationComplete={(event) => {
        window.setTimeout(() => {
          if (typeof onFinish === "function") onFinish(event);
        }, delay * 1000);
      }}>
      {children}
    </motion.div>
  );
}

SwingAnimation.propTypes = {
  delay: PropTypes.number,
  onFinish: PropTypes.func,
  children: PropTypes.node,
};
