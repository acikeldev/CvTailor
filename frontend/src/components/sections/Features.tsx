import Container from '../layout/Container';
import { Card } from '../ui/Card';
import Icon from '../ui/Icon';

const Features = () => {
  const features = [
    {
      icon: 'brain',
      title: 'Google Gemini AI Analysis',
      description: 'Advanced AI powered by Google Gemini analyzes your CV for comprehensive insights and personalized recommendations.'
    },
    {
      icon: 'shield',
      title: 'ATS Optimization',
      description: 'Ensure your CV passes Applicant Tracking Systems with our specialized formatting and keyword optimization.'
    },
    {
      icon: 'target',
      title: 'Job Match Scoring',
      description: 'Get precise compatibility scores between your CV and job descriptions to prioritize applications.'
    },
    {
      icon: 'search',
      title: 'Missing Keywords Detection',
      description: 'Identify critical keywords you\'re missing and get suggestions to improve your relevance to employers.'
    },
    {
      icon: 'chart',
      title: 'Actionable Improvements',
      description: 'Receive specific, actionable recommendations to enhance your CV\'s impact and effectiveness.'
    },
    {
      icon: 'lightning',
      title: 'Instant Feedback',
      description: 'Get immediate analysis and suggestions the moment you upload your CV - no waiting required.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-background-light">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-dark mb-4">
            Powerful Features for <span className="text-primary-purple">Career Success</span>
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Our AI-powered platform provides everything you need to create a standout CV that gets noticed by employers and passes through ATS systems.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center hover:scale-105 transition-transform duration-200">
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon name={feature.icon} size="lg" className="text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-text-dark mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-text-light leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features; 