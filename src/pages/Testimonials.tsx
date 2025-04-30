import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      studentName: 'Sarah Johnson',
      university: 'Stanford University',
      course: 'Computer Science',
      year: 2023,
      content: 'EduConsult made my dream of studying at Stanford a reality. Their guidance throughout the application process was invaluable.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      id: '2',
      studentName: 'Michael Chen',
      university: 'MIT',
      course: 'Electrical Engineering',
      year: 2023,
      content: 'The personalized attention and expert advice helped me secure admission to my top-choice university. Forever grateful!',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      id: '3',
      studentName: 'Priya Patel',
      university: 'Harvard University',
      course: 'Business Administration',
      year: 2022,
      content: 'From university selection to visa guidance, EduConsult supported me at every step. Their expertise is unmatched.',
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
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
            <h1 className="text-4xl font-bold mb-6">Success Stories</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Read about the experiences of our students who achieved their dreams of studying in the
              United States.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.studentName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white text-xl font-semibold">
                      {testimonial.studentName}
                    </h3>
                    <p className="text-gray-200">
                      {testimonial.university} - {testimonial.course}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <p className="text-sm text-gray-500">Class of {testimonial.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Video Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Add video testimonial components here */}
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Video testimonial placeholder</p>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Video testimonial placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">95%</h3>
              <p className="text-gray-600">Admission Success Rate</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">1000+</h3>
              <p className="text-gray-600">Students Placed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">200+</h3>
              <p className="text-gray-600">Partner Universities</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;