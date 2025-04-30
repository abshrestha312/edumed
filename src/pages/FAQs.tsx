import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQ } from '../types';

const FAQs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'admissions' | 'visa' | 'post-arrival'>('admissions');
  const [openFaqs, setOpenFaqs] = useState<string[]>([]);

  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'admissions',
      question: 'What are the basic requirements for applying to U.S. universities?',
      answer: 'Basic requirements typically include academic transcripts, standardized test scores (SAT/ACT), English proficiency test scores (TOEFL/IELTS), letters of recommendation, and a personal statement. Specific requirements may vary by university.',
    },
    {
      id: '2',
      category: 'admissions',
      question: 'When should I start my application process?',
      answer: 'We recommend starting the application process 12-18 months before your intended start date. This gives you enough time to prepare and take required tests, gather documents, and meet application deadlines.',
    },
    {
      id: '3',
      category: 'visa',
      question: 'What documents do I need for a student visa application?',
      answer: 'Required documents include Form I-20, DS-160 form, passport, academic transcripts, standardized test scores, proof of financial support, and photographs. Additional documents may be required based on individual circumstances.',
    },
    {
      id: '4',
      category: 'post-arrival',
      question: 'How can I find housing near my university?',
      answer: 'Most universities offer on-campus housing options for international students. We can help you explore both on-campus and off-campus housing options, considering factors like location, cost, and safety.',
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.category === activeCategory &&
      (searchTerm === '' ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Find answers to common questions about studying in the United States.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveCategory('admissions')}
              className={`px-4 py-2 rounded-md ${
                activeCategory === 'admissions'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Admissions
            </button>
            <button
              onClick={() => setActiveCategory('visa')}
              className={`px-4 py-2 rounded-md ${
                activeCategory === 'visa'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Visa
            </button>
            <button
              onClick={() => setActiveCategory('post-arrival')}
              className={`px-4 py-2 rounded-md ${
                activeCategory === 'post-arrival'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Post-Arrival
            </button>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFaqs.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaqs.includes(faq.id) && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8">
            Our education consultants are here to help you with any questions you may have about
            studying in the United States.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQs;