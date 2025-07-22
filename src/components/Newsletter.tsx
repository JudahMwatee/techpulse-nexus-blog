import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Zap, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      // Here you would integrate with your newsletter service
      console.log("Newsletter signup:", email);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 shadow-elegant backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 shadow-glow">
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Stay in the Tech Loop
                </h2>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get the latest startup news, tech trends, and exclusive insights delivered 
                  straight to your inbox. Join our community of forward-thinking professionals.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Breaking News</h3>
                  <p className="text-sm text-muted-foreground">
                    Be the first to know about major tech developments and startup announcements.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Market Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Weekly analysis of tech market trends and investment opportunities.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Exclusive Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Subscriber-only interviews, deep dives, and industry reports.
                  </p>
                </div>
              </div>

              {/* Newsletter form */}
              {!subscribed ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-background border-border/50"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    No spam. Unsubscribe at any time. Read our privacy policy.
                  </p>
                </form>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Welcome to TechPulse!</h3>
                  <p className="text-muted-foreground">
                    Check your email for a confirmation message. Your first newsletter will arrive soon.
                  </p>
                </div>
              )}

              {/* Social proof */}
              <div className="text-center mt-8 pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Join <span className="font-semibold text-primary">50,000+</span> tech professionals 
                  who get their weekly dose of innovation from TechPulse
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;