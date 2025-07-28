-- Create a table for public user profiles
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL,
  role TEXT,
  PRIMARY KEY (id)
);

-- Enable Row Level Security for the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Public profiles are viewable by everyone.
CREATE POLICY "Public profiles are viewable by everyone."
ON users FOR SELECT
USING ( true );

-- Policy: Users can insert their own profile.
CREATE POLICY "Users can insert their own profile."
ON users FOR INSERT
WITH CHECK ( auth.uid() = id );

-- Policy: Users can update their own profile.
CREATE POLICY "Users can update own profile."
ON users FOR UPDATE
USING ( auth.uid() = id );

-- Set up Realtime for the users table
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE users;
