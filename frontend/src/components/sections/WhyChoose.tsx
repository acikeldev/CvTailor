import Container from '../layout/Container';
import Icon from '../ui/Icon';

const WhyChoose = () => {
  const stats = [
    {
      icon: 'trophy',
      metric: '300%',
      title: '3x Higher Interview Rate',
      description: 'Users see a 300% increase in interview invitations after optimizing with CVTailor.'
    },
    {
      icon: 'clock',
      metric: '10+ hrs',
      title: 'Save 10+ Hours Weekly',
      description: 'Stop manually tailoring CVs for each job. Our AI does it instantly.'
    },
    {
      icon: 'shield',
      metric: '95%',
      title: '95% ATS Pass Rate',
      description: 'Our optimized CVs successfully pass through Applicant Tracking Systems.'
    },
    {
      icon: 'star',
      metric: '50k+',
      title: 'Trusted by 50k+ Professionals',
      description: 'Join thousands of successful job seekers who landed their dream roles.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-light">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-dark mb-4">
            Why Choose <span className="text-accent-green">CVTailor?</span>
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Join successful professionals who've transformed their careers with our AI-powered CV optimization.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon name={stat.icon} size="lg" className="text-white" />
              </div>
              
              {/* Metric */}
              <div className="text-4xl font-bold text-accent-green mb-3">
                {stat.metric}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-text-dark mb-4">
                {stat.title}
              </h3>
              
              {/* Description */}
              <p className="text-text-light leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChoose; 