/*
  # Update Messages Table Policies
  
  1. Changes
    - Allow anonymous messages from contact form
    - Modify existing policies to handle both authenticated and anonymous messages
    
  2. Security
    - Messages without student_id are allowed (contact form)
    - Authenticated users can still only see their own messages
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own messages" ON messages;
DROP POLICY IF EXISTS "Users can create their own messages" ON messages;

-- Create new policies
CREATE POLICY "Allow viewing messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    -- Users can view their own messages
    (student_id = auth.uid())
    OR
    -- Admins can view all messages (you may want to add this later)
    -- (auth.uid() IN (SELECT id FROM profiles WHERE is_admin = true))
    -- For now, users can only see their own messages
    false
  );

CREATE POLICY "Allow creating messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Authenticated users can only set their own ID
    (student_id IS NULL) 
    OR 
    (student_id = auth.uid())
  );

-- Allow anonymous messages (for contact form)
CREATE POLICY "Allow anonymous messages"
  ON messages FOR INSERT
  TO anon
  WITH CHECK (student_id IS NULL);