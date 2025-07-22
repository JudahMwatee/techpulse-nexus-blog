import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight, Eye } from "lucide-react";

const featuredPosts = [
  {
    id: 1,
    title: "The Rise of AI-Powered Startups: How Machine Learning is Reshaping Industries",
    excerpt: "Exploring how artificial intelligence is transforming traditional business models and creating unprecedented opportunities for entrepreneurs.",
    category: "AI & Machine Learning",
    author: "Sarah Chen",
    readTime: "8 min read",
    publishedAt: "2 hours ago",
    views: "12.4K",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Crypto Winter or Spring? Analyzing the Latest Market Trends",
    excerpt: "A deep dive into the current cryptocurrency landscape and what it means for blockchain innovation and investment strategies.",
    category: "Blockchain",
    author: "Marcus Rodriguez",
    readTime: "6 min read",
    publishedAt: "5 hours ago",
    views: "8.7K",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Green Tech Revolution: Sustainable Startups Leading Climate Change Solutions",
    excerpt: "Meet the innovative companies developing cutting-edge technologies to combat climate change and build a sustainable future.",
    category: "Green Tech",
    author: "Elena Nakamura",
    readTime: "10 min read",
    publishedAt: "1 day ago",
    views: "15.2K",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop"
  }
];

const FeaturedPosts = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className={`group cursor-pointer transition-all duration-300 hover:shadow-card hover:-translate-y-2 bg-gradient-card border-border/50 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={post.image}
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
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <span>{post.publishedAt}</span>
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