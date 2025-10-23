import Hero from "../../components/ui/Hero";
import Features from "../../components/ui/Features";
import Analytics from "../../components/ui/Analytics";
import Footer from "../../components/ui/Footer";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import Navbar from "../../components/ui/Navbar";
const LandingPage = () => {
  useDocumentTitle("Trang Chủ");
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Analytics />
      <Footer />
    </div>
  );
};

export default LandingPage;
