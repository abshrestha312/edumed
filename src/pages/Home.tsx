import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Building2, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const metrics = [
    { icon: Users, label: 'Students Placed', value: '1000+' },
    { icon: Building2, label: 'Partner Universities', value: '200+' },
    { icon: GraduationCap, label: 'Success Rate', value: '95%' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      university: 'Stanford University',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      quote: 'EduMed made my dream of studying in the US a reality. Their guidance was invaluable throughout the entire process.',
    },
    {
      name: 'Michael Chen',
      university: 'MIT',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      quote: 'The personalized attention and expert advice helped me secure admission to my top-choice university.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Your Journey to U.S. Education Starts Here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8"
          >
            Expert guidance for international students seeking quality education in the United States
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-4"
          >
            <Link
              to="/contact"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md font-medium"
            >
              Book a Consultation
            </Link>
            <Link
              to="/services"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium"
            >
              Our Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <metric.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{metric.value}</h3>
                <p className="text-gray-600">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Student Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.university}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.quote}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/testimonials"
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
            >
              View More Success Stories
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your U.S. Education Journey?
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Let our experts guide you through every step of the process, from university selection to
            visa application.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-teal-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;