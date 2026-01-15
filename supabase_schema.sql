-- Create Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    points TEXT[] DEFAULT '{}',
    is_current BOOLEAN DEFAULT false
);

-- Create Messages Table for Contact Form
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for Experiences
-- Public read access
CREATE POLICY "Public experiences are viewable by everyone" 
ON experiences FOR SELECT USING (true);

-- Admin full access (You can refine this with auth.uid() checks if you have auth set up)
CREATE POLICY "Admins can insert experiences" 
ON experiences FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update experiences" 
ON experiences FOR UPDATE USING (true);

CREATE POLICY "Admins can delete experiences" 
ON experiences FOR DELETE USING (true);

-- Policies for Messages
-- Public can insert (send messages)
CREATE POLICY "Anyone can send a message" 
ON messages FOR INSERT WITH CHECK (true);

-- Only admins can read messages
CREATE POLICY "Admins can view messages" 
ON messages FOR SELECT USING (true);
