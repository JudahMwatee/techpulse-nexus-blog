import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import RichTextEditor from '@/components/RichTextEditor';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BlogAdmin = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    image_url: '',
    tags: '',
    read_time: 5,
    published: false,
    featured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [existingDrafts, setExistingDrafts] = useState<any[]>([]);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const { toast } = useToast();

  // Load existing drafts on component mount
  useEffect(() => {
    loadExistingDrafts();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, formData.slug]);

  // Autosave functionality
  useEffect(() => {
    if (!formData.title && !formData.content) return; // Don't autosave empty forms
    
    const autoSaveInterval = setInterval(() => {
      autoSaveDraft();
    }, 30000); // Autosave every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  const loadExistingDrafts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, created_at, updated_at')
        .eq('published', false)
        .order('updated_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setExistingDrafts(data || []);
    } catch (error: any) {
      console.error('Error loading drafts:', error);
    }
  };

  const autoSaveDraft = useCallback(async () => {
    if (!formData.title && !formData.content) return;
    
    setIsAutoSaving(true);
    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const draftData = {
        title: formData.title || 'Untitled Draft',
        slug: formData.slug || `draft-${Date.now()}`,
        excerpt: formData.excerpt || null,
        content: formData.content,
        category: formData.category || 'Draft',
        author: formData.author || 'Unknown',
        image_url: formData.image_url || null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        read_time: formData.read_time,
        published: false,
        featured: false,
      };

      if (currentDraftId) {
        // Update existing draft
        const { error } = await supabase
          .from('blog_posts')
          .update(draftData)
          .eq('id', currentDraftId);
        
        if (error) throw error;
      } else {
        // Create new draft
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([draftData])
          .select('id')
          .single();
        
        if (error) throw error;
        setCurrentDraftId(data.id);
      }

      setLastSaved(new Date());
      await loadExistingDrafts(); // Refresh drafts list
    } catch (error: any) {
      console.error('Autosave failed:', error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [formData, currentDraftId]);

  const loadDraft = async (draftId: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', draftId)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content,
        category: data.category,
        author: data.author,
        image_url: data.image_url || '',
        tags: data.tags ? data.tags.join(', ') : '',
        read_time: data.read_time,
        published: data.published,
        featured: data.featured,
      });

      setCurrentDraftId(draftId);
      toast({
        title: "Draft loaded",
        description: "Your draft has been loaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load draft.",
        variant: "destructive",
      });
    }
  };

  const startNewPost = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
      image_url: '',
      tags: '',
      read_time: 5,
      published: false,
      featured: false,
    });
    setCurrentDraftId(null);
    setLastSaved(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const blogPost = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || null,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        image_url: formData.image_url || null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        read_time: formData.read_time,
        published: formData.published,
        featured: formData.featured,
        published_at: formData.published ? new Date().toISOString() : null,
      };

      let error;
      if (currentDraftId) {
        // Update existing draft
        ({ error } = await supabase
          .from('blog_posts')
          .update(blogPost)
          .eq('id', currentDraftId));
      } else {
        // Create new post
        ({ error } = await supabase
          .from('blog_posts')
          .insert([blogPost]));
      }

      if (error) throw error;

      toast({
        title: "Success!",
        description: currentDraftId ? "Blog post updated successfully." : "Blog post created successfully.",
      });

      // Reset form and load drafts
      startNewPost();
      await loadExistingDrafts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Blog Admin</h1>
              <p className="text-muted-foreground">Create and manage blog posts with rich text editing</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              {lastSaved && (
                <p className="text-sm text-muted-foreground">
                  {isAutoSaving ? 'Saving...' : `Last saved: ${lastSaved.toLocaleTimeString()}`}
                </p>
              )}
              <Button onClick={startNewPost} variant="outline" size="sm">
                New Post
              </Button>
            </div>
          </div>
          
          {existingDrafts.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Continue Writing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Load existing draft:</Label>
                  <Select onValueChange={loadDraft}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a draft to continue..." />
                    </SelectTrigger>
                    <SelectContent>
                      {existingDrafts.map((draft) => (
                        <SelectItem key={draft.id} value={draft.id}>
                          {draft.title} - {new Date(draft.updated_at).toLocaleDateString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-friendly-slug"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Input
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description for SEO and previews"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Technology"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image_url">Featured Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="react, javascript, web development"
                    />
                  </div>

                  <div>
                    <Label htmlFor="read_time">Read Time (minutes)</Label>
                    <Input
                      id="read_time"
                      type="number"
                      value={formData.read_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value) || 5 }))}
                      min="1"
                      max="60"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                      />
                      <Label htmlFor="featured">Featured</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (currentDraftId ? 'Updating...' : 'Creating...') : (currentDraftId ? 'Update Blog Post' : 'Create Blog Post')}
                </Button>
                {currentDraftId && (
                  <Button 
                    type="button" 
                    onClick={() => autoSaveDraft()} 
                    variant="outline" 
                    className="w-full" 
                    disabled={isAutoSaving}
                  >
                    {isAutoSaving ? 'Saving Draft...' : 'Save Draft Now'}
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column - Content Editor and Preview */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="editor" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="editor">Editor</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="editor" className="mt-4">
                      <RichTextEditor
                        value={formData.content}
                        onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                        height={600}
                      />
                    </TabsContent>
                    
                    <TabsContent value="preview" className="mt-4">
                      <div className="border rounded-lg p-4 min-h-[600px] bg-background">
                        <h3 className="text-lg font-semibold mb-4">Preview:</h3>
                        {formData.content ? (
                          <MarkdownRenderer content={formData.content} />
                        ) : (
                          <p className="text-muted-foreground">Start writing content to see preview...</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogAdmin;