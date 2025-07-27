import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';

const CTASection = () => {
  const navigate = useNavigate();
  
  const benefits = [
    'No credit card required',
    'Instant analysis in 60 seconds',
    'Cancel anytime'
  ];

  return (
    <section className="py-20 bg-gradient-primary">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          {/* Pre-headline */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Icon name="star" size="sm" className="text-yellow-300" />
            <span className="text-white text-lg font-medium">
              Ready to Transform Your Career?
            </span>
            <Icon name="star" size="sm" className="text-yellow-300" />
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="block">Start Your Journey to</span>
            <span className="block text-accent-green">Dream Job Success</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 50,000+ professionals who've accelerated their careers with AI-powered CV optimization. Your next opportunity is just one click away.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              variant="primary" 
              size="lg" 
              className="text-lg" 
              onClick={() => navigate('/analysis')}
            >
              Get Started Free Today →
            </Button>
            <Button variant="primary-outline" size="lg" className="text-lg">
              View Pricing Plans
            </Button>
          </div>

          {/* Benefits List */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="check" size="sm" className="text-accent-green" />
                <span className="text-white text-sm font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection; 