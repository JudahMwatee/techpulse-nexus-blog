import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface BlogPost {
  id: string;
  blog_title: string;
  content: string;
  excerpt: string | null;
  category: string;
  author: string;
  read_time: number;
  published_at: string | null;
  views: number;
  image_url: string | null;
  tags: string[] | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError("No article found");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();

        if (error) {
          console.error('Error fetching post:', error);
          setError("Failed to load article");
          return;
        }

        if (!data) {
          setError("Article not found");
          return;
        }

        setPost(data);

        // Update view count
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ views: data.views + 1 })
          .eq('id', data.id);

        if (updateError) {
          console.error('Error updating views:', updateError);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">{error || "The article you're looking for doesn't exist."}</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Badge className="bg-primary text-primary-foreground mb-4">
              {post.category}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.blog_title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.read_time} min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{post.views} views</span>
            </div>
            {post.published_at && (
              <span>
                {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
              </span>
            )}
          </div>

          {post.image_url && (
            <div className="mb-8">
              <img 
                src={post.image_url} 
                alt={post.blog_title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;