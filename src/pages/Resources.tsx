import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Calculator, FileText, Calendar, Download } from 'lucide-react';

const Resources: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState({
    tuition: '',
    living: '',
    books: '',
    insurance: ''
  });
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const handleCalculate = () => {
    const tuition = parseFloat(calculatorData.tuition) || 0;
    const living = (parseFloat(calculatorData.living) || 0) * 12; // Monthly to yearly
    const books = (parseFloat(calculatorData.books) || 0) * 2; // Per semester to yearly
    const insurance = parseFloat(calculatorData.insurance) || 0;

    const total = tuition + living + books + insurance;
    setTotalCost(total);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalculatorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resources = [
    {
      icon: Book,
      title: 'Study Guides',
      description: 'Comprehensive guides for test preparation and academic success.',
      items: [
        {
          name: 'SAT/ACT Preparation Guide',
          link: 'https://www.khanacademy.org/test-prep/sat',
        },
        {
          name: 'TOEFL Study Materials',
          link: 'https://www.ets.org/toefl/test-takers/ibt/prepare.html',
        },
        {
          name: 'GRE/GMAT Resources',
          link: 'https://www.mba.com/exams/gmat/prepare',
        },
        {
          name: 'Academic Writing Guidelines',
          link: 'https://owl.purdue.edu/owl/general_writing/academic_writing/',
        },
      ],
    },
    {
      icon: Calculator,
      title: 'Budget Planning',
      description: 'Tools and resources for financial planning and management.',
      items: [
        {
          name: 'Financial Planning Worksheet',
          link: 'https://educationusa.state.gov/financial-aid-financial-planning',
        },
        {
          name: 'Scholarship Guide',
          link: 'https://www.internationalstudent.com/scholarships/',
        },
        {
          name: 'Cost Comparison Tool',
          link: 'https://www.collegedata.com/college-search',
        },
        {
          name: 'Budget Template',
          link: 'https://www.salliemae.com/college-planning/tools/college-planning-calculator/',
        },
      ],
    },
    {
      icon: FileText,
      title: 'Application Resources',
      description: 'Templates and guides for your application process.',
      items: [
        {
          name: 'SOP Writing Guide',
          link: 'https://www.prepscholar.com/gre/blog/statement-of-purpose-format/',
        },
        {
          name: 'Resume Templates',
          link: 'https://www.indeed.com/career-advice/resumes-cover-letters/college-student-resume-template',
        },
        {
          name: 'LOR Guidelines',
          link: 'https://www.princetonreview.com/grad-school-advice/letter-of-recommendation',
        },
        {
          name: 'Application Checklist',
          link: 'https://bigfuture.collegeboard.org/plan-for-college/your-college-application',
        },
      ],
    },
    {
      icon: Calendar,
      title: 'Important Dates',
      description: 'Key deadlines and events for your academic journey.',
      items: [
        {
          name: '2024 Application Calendar',
          link: 'https://www.commonapp.org/apply/first-time-students',
        },
        {
          name: 'Test Dates Schedule',
          link: 'https://collegereadiness.collegeboard.org/sat/register/dates-deadlines',
        },
        {
          name: 'Visa Interview Guide',
          link: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html',
        },
        {
          name: 'Pre-departure Checklist',
          link: 'https://educationusa.state.gov/your-5-steps-us-study/prepare-your-departure',
        },
      ],
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
            <h1 className="text-4xl font-bold mb-6">Resources & Tools</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Access our comprehensive collection of resources to help you prepare for your U.S.
              education journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <resource.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h2 className="text-2xl font-bold mb-4">{resource.title}</h2>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <ul className="space-y-3">
                  {resource.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between">
                      <span className="text-gray-700">{item.name}</span>
                      <a
                        href={item.link}
                        className="flex items-center text-indigo-600 hover:text-indigo-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Budget Calculator</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tuition Fee (per year)
                </label>
                <input
                  type="number"
                  name="tuition"
                  value={calculatorData.tuition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter tuition fee"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Living Expenses (per month)
                </label>
                <input
                  type="number"
                  name="living"
                  value={calculatorData.living}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter living expenses"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Books and Supplies (per semester)
                </label>
                <input
                  type="number"
                  name="books"
                  value={calculatorData.books}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter books and supplies cost"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance (per year)
                </label>
                <input
                  type="number"
                  name="insurance"
                  value={calculatorData.insurance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter insurance cost"
                />
              </div>
              <button
                onClick={handleCalculate}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700"
              >
                Calculate Total Cost
              </button>
              
              {totalCost !== null && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Estimated Total Cost (per year)</h3>
                  <p className="text-2xl font-bold text-indigo-600">
                    ${totalCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    This is an estimated cost. Actual expenses may vary based on location, lifestyle, and other factors.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Downloadable Resources</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Access our collection of helpful guides, templates, and checklists to assist you in your
            application journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FileText className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <span className="block font-medium">Application Checklist</span>
            </button>
            <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FileText className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <span className="block font-medium">Visa Interview Guide</span>
            </button>
            <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FileText className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <span className="block font-medium">Budget Planning Template</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;