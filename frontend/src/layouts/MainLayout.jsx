import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Outlet } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Breadcrumbs from "../components/navigation/Breadcrumbs";
import Footer from "../components/common/Footer";

function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <Breadcrumbs />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -8,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default MainLayout;