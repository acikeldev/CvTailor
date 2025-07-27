import Container from '../layout/Container';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: 'upload',
      title: 'Upload Your CV',
      description: 'Simply drag and drop your CV or upload it in any format. Our system supports PDF, Word, and text files.'
    },
    {
      number: '02',
      icon: 'brain',
      title: 'AI Analysis',
      description: 'Google Gemini AI analyzes your CV structure, content, keywords, and provides comprehensive feedback and suggestions.'
    },
    {
      number: '03',
      icon: 'trophy',
      title: 'Get Optimized CV',
      description: 'Download your improved CV with actionable recommendations, ATS optimization, and enhanced job match potential.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-dark mb-4">
            How CVTailor <span className="text-blue-500">Works</span>
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Three simple steps to transform your CV and boost your job search success rate.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-accent-green rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="bg-blue-50 rounded-2xl p-8 text-center h-full hover:shadow-lg transition-shadow duration-200">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Icon name={step.icon} size="lg" className="text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-text-dark mb-4">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-text-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Flow Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="arrow" size="md" className="text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button variant="primary" size="lg" className="text-lg">
            Start Your CV Analysis →
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks; 