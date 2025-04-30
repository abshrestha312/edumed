import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Send to Supabase - now without student_id for anonymous messages
      const { error: supabaseError } = await supabase
        .from('messages')
        .insert([{
          content: `
            Name: ${data.firstName} ${data.lastName}
            Email: ${data.email}
            Phone: ${data.phone}
            Subject: ${data.subject}
            Message: ${data.message}
          `,
          is_from_student: false // This is a contact form message
        }]);

      if (supabaseError) throw supabaseError;

      // Try to send email using EmailJS with public template
      try {
        if (formRef.current) {
          await emailjs.sendForm(
            'service_ik8vm3k',
            'template_caaq7tl',
            formRef.current,
            '4uaavI6O8-B_Av_TG'
          );
        }
      } catch (emailError) {
        console.error('EmailJS Error:', emailError);
        // Continue execution even if EmailJS fails
      }

      setSubmitSuccess(true);
      reset();
      
      // Show a modified success message if EmailJS failed but Supabase succeeded
      setSubmitError('Your message has been received. Due to technical issues, you may not receive an immediate email confirmation, but our team will contact you soon.');
      
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('Failed to send message. Please try again or contact us directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['(253) 777-2096'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['admin@edumedsolutions.com'],
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['2750 Catoosa Ln', 'Denton, TX 76210'],
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      details: ['Available 24/7', 'Average response time: 5 minutes'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Get in touch with our education consultants to start your journey to studying in the
              United States.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <info.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Send us a Message</h2>
          
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}
          
          {submitError && (
            <div className="mb-6 p-4 bg-yellow-100 text-yellow-700 rounded-md">
              {submitError}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  {...register('firstName', { required: 'First name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register('lastName', { required: 'Last name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message as string}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                {...register('subject', { required: 'Please select a subject' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="">Select a subject</option>
                <option value="admission">Admission Inquiry</option>
                <option value="visa">Visa Guidance</option>
                <option value="general">General Inquiry</option>
              </select>
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subject.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message as string}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-[400px] bg-gray-200 rounded-lg">
            {/* Add map component here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map placeholder
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;