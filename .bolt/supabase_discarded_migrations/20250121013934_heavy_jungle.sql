/*
  # Update messages table RLS policies

  1. Changes
    - Add policy to allow anonymous message submissions
    - Keep existing policies for authenticated users

  2. Security
    - Allow anonymous submissions but with student_id as null
    - Maintain existing RLS for authenticated users
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can create messages" ON messages;

-- Create new policy for anonymous submissions
CREATE POLICY "Anyone can create messages"
  ON messages FOR INSERT
  WITH CHECK (
    -- Allow messages with null student_id (anonymous submissions)
    student_id IS NULL
    OR
    -- Or authenticated users can submit with their ID
    (auth.uid() = student_id)
  );

-- Keep existing select policy
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (
    -- Allow viewing messages with null student_id (anonymous submissions)
    student_id IS NULL
    OR
    -- Or authenticated users can view their own messages
    (auth.uid() = student_id)
  );