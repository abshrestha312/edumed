/*
  # Fix Profile and Application Policies

  1. Security Updates
    - Update RLS policies for profiles table to allow creation and updates
    - Ensure authenticated users can manage their own profiles
    - Fix application creation policies
*/

-- Drop existing policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create new policies for profiles
CREATE POLICY "Enable insert for authenticated users only"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable select for users based on user_id"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Drop existing policies for applications
DROP POLICY IF EXISTS "Users can view their own applications" ON applications;
DROP POLICY IF EXISTS "Users can create their own applications" ON applications;

-- Create new policies for applications
CREATE POLICY "Enable insert for authenticated users only"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Enable select for users based on user_id"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Enable update for users based on user_id"
  ON applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);