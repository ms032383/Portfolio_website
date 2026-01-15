-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects Table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  tech_stack text[],
  live_link text,
  github_link text,
  image text default '/images/project-placeholder.jpg',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Skills Table (flattened structure with category)
create table skills (
  id uuid default uuid_generate_v4() primary key,
  category text not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Achievements Table
create table achievements (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Profile Table (Singleton)
create table profile (
  id uuid default uuid_generate_v4() primary key,
  name text,
  title text,
  tagline text,
  email text,
  phone text,
  location text,
  resume_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert Default Profile (so there's always one row)
insert into profile (name, title, tagline, email, phone, location)
values ('Mohan Singh', 'Full Stack Developer', 'Building digital experiences.', 'contact@mohan.dev', '+91 98765 43210', 'India')
on conflict do nothing;

-- RLS Policies (Simple Public Read / Auth Write)
alter table projects enable row level security;
alter table skills enable row level security;
alter table achievements enable row level security;
alter table profile enable row level security;

-- Allow public read access
create policy "Public Read Projects" on projects for select using (true);
create policy "Public Read Skills" on skills for select using (true);
create policy "Public Read Achievements" on achievements for select using (true);
create policy "Public Read Profile" on profile for select using (true);

-- Allow write access only to authenticated users (or anon if we skip auth for now, but better to secure)
-- For now, enabling anon write to test without auth flow complexity if needed, OR user can use the Dashboard SQL editor
create policy "Anon Write Projects" on projects for all using (true);
create policy "Anon Write Skills" on skills for all using (true);
create policy "Anon Write Achievements" on achievements for all using (true);
create policy "Anon Write Profile" on profile for all using (true);
