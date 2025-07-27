import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-hero text-white py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">AI Powered</span>
                <span className="block text-blue-200">Job Seeking</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-lg">
                Transform your CV with AI-powered insights. Get instant feedback, ATS optimization, and match your skills to dream jobs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="text-lg"
                onClick={() => navigate('/analysis')}
              >
                Get Started Free →
              </Button>
              <Button variant="primary-outline" size="lg" className="text-lg">
                Watch Demo
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icon name="upload" size="md" />
                </div>
                <span className="text-base font-medium">Upload CV</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icon name="brain" size="md" />
                </div>
                <span className="text-base font-medium">AI Analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icon name="trophy" size="md" />
                </div>
                <span className="text-base font-medium">Get Hired</span>
              </div>
            </div>
          </div>

          {/* Right Content - Illustrative Graphic */}
          <div className="relative">
            <div className="bg-teal-900/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-600 rounded w-5/6"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-2 bg-white/20 rounded w-2/3"></div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-2 bg-white/20 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="chart" size="md" />
            </div>
            <div className="absolute top-1/2 -left-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="document" size="md" />
            </div>
            <div className="absolute -bottom-6 right-1/4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="rocket" size="md" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero; 