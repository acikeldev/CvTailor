import { useState } from 'react';
import Container from '../layout/Container';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: "How does the AI CV analysis work?",
      answer: "Our AI, powered by Google Gemini, analyzes your CV's structure, content, keywords, and formatting. It compares your skills against job market trends and provides personalized recommendations to improve your CV's effectiveness."
    },
    {
      question: "What file formats do you support?",
      answer: "We support PDF, Word (.doc, .docx), and plain text files. Simply upload your CV in any of these formats and our system will process it automatically."
    },
    {
      question: "How accurate is the job match scoring?",
      answer: "Our job match scoring uses advanced AI algorithms to analyze keyword matches, skill relevance, and industry standards. The scoring is based on real job market data and provides highly accurate compatibility assessments."
    },
    {
      question: "Is my CV data secure and private?",
      answer: "Yes, your data security is our top priority. All CV uploads are encrypted, processed securely, and automatically deleted after analysis. We never store or share your personal information."
    },
    {
      question: "How long does the analysis take?",
      answer: "Our AI analysis is incredibly fast - you'll receive comprehensive feedback and recommendations within 60 seconds of uploading your CV."
    },
    {
      question: "Can I use CVTailor for multiple job applications?",
      answer: "Absolutely! You can analyze your CV against multiple job descriptions to see how well you match each position. This helps you prioritize your applications and tailor your approach."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-dark mb-4">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Everything you need to know about CVTailor and how it can transform your job search.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md border transition-all duration-200 ${
                openIndex === index 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
              >
                <h3 className="text-lg font-semibold text-text-dark pr-4">
                  {item.question}
                </h3>
                <span className={`text-blue-500 text-xl transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-text-light leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ; 