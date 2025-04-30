import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/AuthProvider';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Universities from './pages/Universities';
import Testimonials from './pages/Testimonials';
import Resources from './pages/Resources';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import WhatsAppButton from './components/WhatsAppButton';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="universities" element={<Universities />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="resources" element={<Resources />} />
              <Route path="faqs" element={<FAQs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="portal" element={<Portal />} />
            </Route>
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;