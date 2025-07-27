import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import WhyChoose from './components/sections/WhyChoose';
import FAQ from './components/sections/FAQ';
import CTASection from './components/sections/CTASection';
import Footer from './components/layout/Footer';
import CvAnalysis from './pages/CvAnalysis';
import CvBuilder from './pages/CvBuilder';

// Landing Page Component
const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <WhyChoose />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analysis" element={<CvAnalysis />} />
        <Route path="/builder" element={<CvBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
