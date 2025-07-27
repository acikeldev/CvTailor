import Container from './Container';
import Icon from '../ui/Icon';

const Footer = () => {
  const navigationSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'API', href: '#api' },
        { name: 'Integrations', href: '#integrations' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#blog' },
        { name: 'Career Tips', href: '#career-tips' },
        { name: 'Templates', href: '#templates' },
        { name: 'Support', href: '#support' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Privacy', href: '#privacy' },
        { name: 'Terms', href: '#terms' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'twitter', href: '#' },
    { name: 'LinkedIn', icon: 'linkedin', href: '#' },
    { name: 'Discord', icon: 'discord', href: '#' },
    { name: 'Email', icon: 'email', href: '#' }
  ];

  return (
    <footer className="bg-background-dark text-white py-16">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold">CVTailor</span>
            </div>
            <p className="text-text-light mb-6 leading-relaxed">
              AI-powered CV optimization platform helping professionals land their dream jobs faster.
            </p>
            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-text-light hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size="sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-text-light hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-text-light text-center">
            © 2025 CVTailor. All rights reserved. Built with AI to empower your career journey.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 