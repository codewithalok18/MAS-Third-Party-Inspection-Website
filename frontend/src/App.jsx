import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Industries from "./pages/Industries/Industries";
import IndustryDetail from "./pages/Industries/IndustryDetail";
import News from "./pages/News/News";
import Downloads from "./pages/Downloads/Downloads";
import Contact from "./pages/Contact/Contact";
import NewsDetail from "./pages/News/NewsDetail";
import NotFound from "./pages/NotFound/NotFound";
import ClientPortal from "./pages/ClientPortal/ClientPortal";
import ServiceDetail from "./pages/Services/ServiceDetail";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries/:slug" element={<IndustryDetail />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/client-portal" element={<ClientPortal />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Route>
    </Routes>
  );
}

export default App;