import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, MessageSquare, Upload, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';
import { supabase } from '../lib/supabase';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import type { ApplicationStatus } from '../types';
import { useNavigate } from 'react-router-dom';

const Portal: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          university:universities(name),
          course:courses(name),
          documents(*)
        `)
        .eq('student_id', user?.id);

      if (error) throw error;

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewApplication = async () => {
    setError(null);
    try {
      // First ensure profile exists
      const { data: profiles, error: profileQueryError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id);

      if (profileQueryError) throw profileQueryError;

      if (!profiles || profiles.length === 0) {
        // Create profile if it doesn't exist
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user?.id,
              first_name: user?.email?.split('@')[0] || '',
              last_name: '',
              email: user?.email,
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) throw profileError;
      }

      // Create new application
      const { error: applicationError } = await supabase
        .from('applications')
        .insert([
          {
            student_id: user?.id,
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ]);

      if (applicationError) throw applicationError;

      // Refresh applications
      await fetchApplications();
    } catch (error: any) {
      console.error('Error creating application:', error);
      setError(error.message || 'Failed to create application');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Student Portal</h2>
            <p className="mt-2 text-gray-600">Sign in or create an account</p>
          </div>
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <LoginForm />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
              <p className="mt-1 text-sm text-gray-500">
                Track your applications and manage your documents
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first application.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleNewApplication}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    New Application
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {applications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {application.university}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {application.course}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : application.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>

                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900">Documents</h4>
                      <ul className="mt-2 divide-y divide-gray-200">
                        {application.documents.map((doc) => (
                          <li key={doc.id} className="py-2 flex items-center justify-between">
                            <span className="text-sm text-gray-600">{doc.name}</span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                doc.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : doc.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;