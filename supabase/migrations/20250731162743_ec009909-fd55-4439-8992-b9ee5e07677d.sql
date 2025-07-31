-- Update blog_posts RLS policies to be admin-only for write operations
DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON public.blog_posts;

-- Create admin-only policies (you'll need to manually set your user as admin)
CREATE POLICY "Admin only can create blog posts" ON public.blog_posts
FOR INSERT TO authenticated
WITH CHECK (auth.email() = 'your-admin-email@example.com');

CREATE POLICY "Admin only can update blog posts" ON public.blog_posts
FOR UPDATE TO authenticated
USING (auth.email() = 'your-admin-email@example.com');

CREATE POLICY "Admin only can delete blog posts" ON public.blog_posts
FOR DELETE TO authenticated
USING (auth.email() = 'your-admin-email@example.com');

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS on comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read approved comments
CREATE POLICY "Anyone can view approved comments" ON public.comments
FOR SELECT USING (approved = true);

-- Allow anyone to create comments (they'll need approval)
CREATE POLICY "Anyone can create comments" ON public.comments
FOR INSERT WITH CHECK (true);

-- Only admin can approve/manage comments
CREATE POLICY "Admin can manage all comments" ON public.comments
FOR ALL TO authenticated
USING (auth.email() = 'your-admin-email@example.com');

-- Add trigger for updated_at on comments
CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();