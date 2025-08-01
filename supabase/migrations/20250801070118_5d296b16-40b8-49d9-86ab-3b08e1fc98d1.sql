-- Create a table for site pages (like About, etc.)
CREATE TABLE public.site_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for page access
CREATE POLICY "Anyone can view site pages" 
ON public.site_pages 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can create site pages" 
ON public.site_pages 
FOR INSERT 
WITH CHECK (auth.email() = 'mwatee@gmail.com');

CREATE POLICY "Admin can update site pages" 
ON public.site_pages 
FOR UPDATE 
USING (auth.email() = 'mwatee@gmail.com');

CREATE POLICY "Admin can delete site pages" 
ON public.site_pages 
FOR DELETE 
USING (auth.email() = 'mwatee@gmail.com');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_site_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_pages_updated_at
BEFORE UPDATE ON public.site_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_site_pages_updated_at();

-- Insert initial About page content
INSERT INTO public.site_pages (slug, title, content) VALUES (
  'about',
  'About TechPulse Kenya – Your Trusted Tech & Innovation Hub',
  'At TechPulse Kenya, we''re more than just a tech blog—we''re a movement. Born from a passion for cutting-edge technology, digital innovation, and empowering Kenyan tech enthusiasts, we deliver insightful, actionable, and engaging content that keeps you ahead in the fast-evolving digital world.

## Who We Are

We are a team of tech enthusiasts, developers, analysts, and storytellers dedicated to demystifying technology for Kenyan businesses, startups, and individuals. Whether you''re a developer, entrepreneur, or tech-curious mind, we break down complex trends into digestible, practical insights.

## What We Do

✅ **Latest Tech News & Trends** – Stay updated with AI, blockchain, fintech, cybersecurity, and more.

✅ **In-Depth Guides & Tutorials** – Master new tools, coding, and digital strategies.

✅ **Startup & Business Tech Insights** – Helping Kenyan businesses leverage tech for growth.

✅ **Honest Gadget & Software Reviews** – Unbiased opinions to guide your tech purchases.

## Why Trust Us?

✔ **Local & Global Perspective** – We blend Kenyan tech developments with worldwide innovations.

✔ **Expert-Backed Content** – Our writers are industry professionals with hands-on experience.

✔ **Community-Driven** – We engage with readers through forums, webinars, and social discussions.

## Our Mission

To bridge the tech knowledge gap in Kenya by providing reliable, engaging, and SEO-optimized content that educates, inspires, and drives digital transformation.

## Join the TechPulse Movement!

Follow us on [Social Media Links] and subscribe for exclusive tech insights. Got a story or collaboration? [Contact Us]—we''d love to hear from you!'
);