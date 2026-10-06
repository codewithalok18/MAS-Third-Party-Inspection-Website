import { motion } from "framer-motion";

function StaggerItem({
  children,
  y = 25,
  duration = 0.5,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default StaggerItem;