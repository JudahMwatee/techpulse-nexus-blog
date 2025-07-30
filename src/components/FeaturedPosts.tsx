import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface BlogPost {
  id: string;
  blog_title: string;
  excerpt: string | null;
  category: string;
  author: string;
  read_time: number;
  published_at: string | null;
  views: number;
  image_url: string | null;
  featured: boolean;
  slug: string;
}

const FeaturedPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <section className="py-12 md:py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <Badge variant="outline" className="mb-3 md:mb-4 border-primary/20 text-primary text-xs md:text-sm">
            Featured Stories
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Latest Tech Insights
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Stay informed with our curated selection of the most important tech news, 
            startup stories, and industry analysis.
          </p>
        </div>

        {loading ? (
          <div className="col-span-full text-center">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground">No featured posts available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className={`group cursor-pointer transition-all duration-300 hover:shadow-card hover:-translate-y-1 md:hover:-translate-y-2 bg-gradient-card border-border/50 ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                }`}
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={post.image_url || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop'}
                    alt={post.blog_title}
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

                <CardContent className="p-4 md:p-6">
                  <h3 className={`font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2 ${
                    index === 0 ? 'text-lg md:text-xl lg:text-2xl' : 'text-base md:text-lg'
                  }`}>
                    {post.blog_title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/blog/${post.slug}`);
                    }}
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8 md:mt-12">
          <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 text-sm md:text-base">
            View All Articles
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;