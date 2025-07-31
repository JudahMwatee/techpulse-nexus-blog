import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, User, Eye } from "lucide-react";

interface BlogPost {
  id: string;
  blog_title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  image_url: string | null;
  read_time: number;
  views: number;
  created_at: string;
  tags: string[] | null;
}

const CyberSecurity = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCyberSecurityPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('category', 'CyberSecurity')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching CyberSecurity posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCyberSecurityPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            CyberSecurity
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest insights, threats, and security practices in the cybersecurity landscape
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
              No CyberSecurity posts yet
            </h3>
            <p className="text-muted-foreground">
              Check back soon for the latest cybersecurity insights and analysis.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <Link to={`/blog/${post.slug}`}>
                  {post.image_url && (
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={post.image_url}
                        alt={post.blog_title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.created_at).toLocaleDateString()}
                      <User className="w-4 h-4 ml-2" />
                      {post.author}
                      <Eye className="w-4 h-4 ml-2" />
                      {post.views}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.blog_title}
                    </CardTitle>
                    <CardDescription>
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {post.read_time} min read
                      </span>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CyberSecurity;