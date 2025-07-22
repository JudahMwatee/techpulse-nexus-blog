-- Create blog posts table for content management
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[],
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  views INTEGER NOT NULL DEFAULT 0,
  read_time INTEGER NOT NULL DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published posts
CREATE POLICY "Published blog posts are publicly readable" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Create policies for authenticated users to manage all posts (for admin/editor access)
CREATE POLICY "Authenticated users can view all blog posts" 
ON public.blog_posts 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create blog posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts" 
ON public.blog_posts 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete blog posts" 
ON public.blog_posts 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON public.blog_posts(featured);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Add some sample data
INSERT INTO public.blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  category, 
  author, 
  published, 
  featured,
  published_at,
  tags
) VALUES 
(
  'The Future of AI in Web Development',
  'future-of-ai-web-development',
  'Exploring how artificial intelligence is revolutionizing the way we build websites and applications.',
  'Artificial Intelligence is transforming every aspect of technology, and web development is no exception. From automated code generation to intelligent user experiences, AI is reshaping how we build digital products...',
  'AI & Machine Learning',
  'TechPulse Team',
  true,
  true,
  now(),
  ARRAY['AI', 'Web Development', 'Technology', 'Future Tech']
),
(
  'Startup Funding Trends in 2024',
  'startup-funding-trends-2024',
  'A comprehensive analysis of the latest funding patterns and investor preferences in the startup ecosystem.',
  'The startup funding landscape has evolved significantly in 2024. With new investment strategies and changing market dynamics, entrepreneurs need to understand the current trends...',
  'Startups',
  'TechPulse Team',
  true,
  false,
  now(),
  ARRAY['Startups', 'Funding', 'Investment', 'Business']
),
(
  'Building Scalable SaaS Architecture',
  'building-scalable-saas-architecture',
  'Best practices and architectural patterns for creating SaaS applications that can handle millions of users.',
  'Creating a SaaS application that can scale from hundreds to millions of users requires careful architectural planning. In this comprehensive guide, we explore the key principles...',
  'Engineering',
  'TechPulse Team',
  true,
  false,
  now(),
  ARRAY['SaaS', 'Architecture', 'Scalability', 'Engineering']
);