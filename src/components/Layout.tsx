import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Universities', path: '/universities' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="EduMed Consulting" 
                  className="h-12"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/portal"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
              >
                Student Portal
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/portal"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Student Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Email: admin@edumedsolutions.com</p>
              <p>Phone: (253) 777-2096</p>
              <p>Address: 2750 Catoosa Ln, Denton, TX 76210</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/services" className="hover:text-teal-400">Our Services</Link></li>
                <li><Link to="/universities" className="hover:text-teal-400">Universities</Link></li>
                <li><Link to="/resources" className="hover:text-teal-400">Resources</Link></li>
                <li><Link to="/contact" className="hover:text-teal-400">Get in Touch</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-teal-400">Facebook</a>
                <a href="#" className="hover:text-teal-400">Twitter</a>
                <a href="#" className="hover:text-teal-400">LinkedIn</a>
                <a href="#" className="hover:text-teal-400">Instagram</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-md text-gray-900 flex-grow"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-r-md hover:bg-teal-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} EduMed Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;