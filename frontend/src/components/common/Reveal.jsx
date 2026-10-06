import { motion } from "framer-motion";

function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  x = 0,
  className = "",
  once = true,
  amount = 0.15,
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x,
        y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;