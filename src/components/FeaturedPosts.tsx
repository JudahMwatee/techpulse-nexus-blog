import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  author: string;
  read_time: number;
  published_at: string | null;
  views: number;
  image_url: string | null;
  featured: boolean;
}

const FeaturedPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .eq('featured', true)
          .order('published_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error fetching posts:', error);
          return;
        }

        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
            Featured Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Tech Insights
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed with our curated selection of the most important tech news, 
            startup stories, and industry analysis.
          </p>
        </div>

        {loading ? (
          <div className="col-span-full text-center">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground">No featured posts available</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className={`group cursor-pointer transition-all duration-300 hover:shadow-card hover:-translate-y-2 bg-gradient-card border-border/50 ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                }`}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={post.image_url || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop'}
                    alt={post.title}
                    className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      index === 0 ? 'h-64 lg:h-96' : 'h-48'
                    }`}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Eye className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{post.views}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 ${
                    index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'
                  }`}>
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt || 'No excerpt available'}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.read_time} min read</span>
                      </div>
                    </div>
                    <span>
                      {post.published_at 
                        ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true })
                        : 'No date'
                      }
                    </span>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full group justify-between hover:bg-primary/5"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;