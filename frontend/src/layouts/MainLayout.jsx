import { Outlet } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Breadcrumbs from "../components/navigation/Breadcrumbs";
import Footer from "../components/common/Footer";
import PageTransition from "../components/common/PageTransition";

function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <Breadcrumbs />

      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
