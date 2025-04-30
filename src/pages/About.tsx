import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Globe, Users } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: 'Dr. Sarah Williams',
      role: 'Founder & Lead Consultant',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: '15+ years of experience in international education consulting',
    },
    {
      name: 'Michael Chen',
      role: 'University Relations Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Former admissions officer at top U.S. universities',
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Student Success Manager',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
      bio: 'Specialized in student mentoring and visa counseling',
    },
  ];

  const values = [
    {
      icon: Users,
      title: 'Student-Centric Approach',
      description: 'Every student journey is unique, and we provide personalized guidance every step of the way.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in our services and partnerships with universities.',
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'Our diverse team brings international experience and cultural understanding.',
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'We stay updated with the latest in education trends and admission requirements.',
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
            <h1 className="text-4xl font-bold mb-6">About EduConsult</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Empowering international students to achieve their dreams of studying in the United States
              through expert guidance and personalized support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, EduConsult emerged from a vision to transform the way international
                students pursue higher education in the United States. What began as a small
                consultancy has grown into a trusted partner for thousands of students worldwide.
              </p>
              <p className="text-gray-600">
                Our journey is marked by the success stories of students who have achieved their
                academic dreams through our guidance. With over a decade of experience, we've built
                strong relationships with leading U.S. universities and developed a deep understanding
                of the international student journey.
              </p>
            </div>
            <div className="relative h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
                alt="Campus life"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <value.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-indigo-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;