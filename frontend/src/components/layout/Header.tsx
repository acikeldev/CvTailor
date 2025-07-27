import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from './Container';
import { Button } from '../ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  const scrollToSection = (href: string) => {
    // Only scroll if we're on the landing page
    if (location.pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to landing page and then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const handleGetStarted = () => {
    navigate('/analysis');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background-dark text-white py-4 sticky top-0 z-50 shadow-lg">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-purple font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold">CVTailor</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="primary-outline" size="sm">Sign In</Button>
            <Button variant="primary" size="sm" onClick={handleGetStarted}>Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4 mt-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white hover:text-gray-200 transition-colors duration-200 text-left"
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="primary-outline" size="sm" className="w-full">Sign In</Button>
              <Button variant="primary" size="sm" className="w-full" onClick={handleGetStarted}>Get Started</Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;