import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, FileText, Plane, Home, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Compass,
      title: 'University Selection',
      description: 'Find the perfect university match based on your academic goals, budget, and preferences.',
      features: [
        'Personalized university recommendations',
        'Course and major selection guidance',
        'Budget planning assistance',
        'Rankings and admission requirements analysis',
      ],
      link: '/universities',
    },
    {
      icon: FileText,
      title: 'Application Assistance',
      description: 'Comprehensive support throughout the entire application process.',
      features: [
        'Application strategy development',
        'Essay review and editing',
        'Document preparation',
        'Deadline management',
      ],
      link: '/contact',
    },
    {
      icon: Plane,
      title: 'Visa Guidance',
      description: 'Expert assistance with student visa application and interview preparation.',
      features: [
        'Visa application review',
        'Interview preparation',
        'Document verification',
        'Travel guidance',
      ],
      link: '/contact',
    },
    {
      icon: Home,
      title: 'Post-Arrival Support',
      description: 'Helping you settle into your new life in the United States.',
      features: [
        'Housing assistance',
        'Bank account setup',
        'Campus orientation',
        'Cultural adjustment support',
      ],
      link: '/contact',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive support for your entire U.S. education journey, from university selection
              to post-arrival assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <service.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our education experts to discuss your goals and how we can
            help you achieve them.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;