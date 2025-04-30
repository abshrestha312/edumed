/*
  # Initial Schema Setup for Education Portal

  1. New Tables
    - `profiles`
      - Student profiles with personal information
    - `applications`
      - Track student applications to universities
    - `universities`
      - University database
    - `documents`
      - Student documents for applications
    - `faqs`
      - FAQ database
    - `messages`
      - Communication between students and consultants

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create universities table
CREATE TABLE IF NOT EXISTS universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location_state text NOT NULL,
  location_lat numeric NOT NULL,
  location_lng numeric NOT NULL,
  ranking integer,
  acceptance_rate numeric,
  tuition_min integer,
  tuition_max integer,
  description text,
  website text,
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id uuid REFERENCES universities ON DELETE CASCADE,
  name text NOT NULL,
  degree_level text NOT NULL,
  department text,
  created_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles ON DELETE CASCADE,
  university_id uuid REFERENCES universities ON DELETE CASCADE,
  course_id uuid REFERENCES courses ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles ON DELETE CASCADE,
  content text NOT NULL,
  is_from_student boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view universities"
  ON universities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Users can create their own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Users can view their own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (application_id IN (
    SELECT id FROM applications WHERE student_id = auth.uid()
  ));

CREATE POLICY "Users can create their own documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (application_id IN (
    SELECT id FROM applications WHERE student_id = auth.uid()
  ));

CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Users can create their own messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Anyone can view FAQs"
  ON faqs FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample universities
INSERT INTO universities (name, location_state, location_lat, location_lng, ranking, acceptance_rate, tuition_min, tuition_max, description)
VALUES
  ('Stanford University', 'California', 37.4275, -122.1697, 2, 4.3, 55000, 65000, 'Stanford University is a private research university in Stanford, California.'),
  ('MIT', 'Massachusetts', 42.3601, -71.0942, 1, 6.7, 53000, 63000, 'The Massachusetts Institute of Technology is a private land-grant research university in Cambridge, Massachusetts.'),
  ('Harvard University', 'Massachusetts', 42.3770, -71.1167, 3, 4.6, 54000, 64000, 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.'),
  ('Yale University', 'Connecticut', 41.3163, -72.9223, 4, 6.1, 55000, 65000, 'Yale University is a private Ivy League research university in New Haven, Connecticut.'),
  ('Princeton University', 'New Jersey', 40.3573, -74.6672, 5, 5.8, 53000, 63000, 'Princeton University is a private Ivy League research university in Princeton, New Jersey.'),
  ('Columbia University', 'New York', 40.8075, -73.9626, 6, 5.4, 58000, 68000, 'Columbia University is a private Ivy League research university in New York City.'),
  ('University of California, Berkeley', 'California', 37.8719, -122.2585, 7, 14.8, 43000, 53000, 'The University of California, Berkeley is a public land-grant research university in Berkeley, California.'),
  ('University of Chicago', 'Illinois', 41.7886, -87.5987, 8, 6.2, 57000, 67000, 'The University of Chicago is a private research university in Chicago, Illinois.');

-- Insert sample FAQs
INSERT INTO faqs (category, question, answer)
VALUES
  ('admissions', 'What standardized tests are required for undergraduate admission?', 'Most U.S. universities require either the SAT or ACT for undergraduate admission. International students must also typically submit TOEFL or IELTS scores to demonstrate English proficiency.'),
  ('admissions', 'When should I start my application process?', 'Start your application process 12-18 months before your intended enrollment date. This gives you enough time to prepare and take required tests, gather documents, and meet application deadlines.'),
  ('admissions', 'How many universities should I apply to?', 'We recommend applying to 8-10 universities: 2-3 reach schools, 3-4 target schools, and 2-3 safety schools.'),
  ('visa', 'What documents are needed for a student visa?', 'Required documents include Form I-20, DS-160, passport, academic transcripts, standardized test scores, proof of financial support, and photographs.'),
  ('visa', 'How long does the visa process take?', 'The visa process typically takes 3-5 weeks after your visa interview, but processing times can vary by country and season.'),
  ('visa', 'Can I work while studying in the U.S.?', 'F-1 students can work on-campus up to 20 hours per week during the academic year and full-time during breaks. Off-campus work requires special authorization.'),
  ('post-arrival', 'How do I find housing near campus?', 'Most universities offer on-campus housing for first-year students. For off-campus housing, start your search 3-4 months before arrival using university housing resources and local rental websites.'),
  ('post-arrival', 'How do I set up a bank account?', 'You can set up a bank account after arriving in the U.S. with your passport, I-20, and proof of U.S. address. Many banks offer student accounts with minimal fees.'),
  ('post-arrival', 'What health insurance do I need?', 'Most universities require international students to have health insurance. You can either purchase the university''s insurance plan or find an approved alternative.');