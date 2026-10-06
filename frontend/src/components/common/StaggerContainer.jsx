import { motion } from "framer-motion";

function StaggerContainer({
  children,
  delayChildren = 0.1,
  staggerChildren = 0.08,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default StaggerContainer;