import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Zap, Users, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic rate limiting (client-side)
    const lastSubmission = localStorage.getItem('newsletter_last_submission');
    const now = Date.now();
    if (lastSubmission && now - parseInt(lastSubmission) < 60000) { // 1 minute cooldown
      toast({
        title: "Too many requests",
        description: "Please wait before subscribing again.",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Store submission timestamp
      localStorage.setItem('newsletter_last_submission', now.toString());
      
      // Call the actual newsletter subscription edge function
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email }
      });

      if (error) {
        throw error;
      }
      
      setSubscribed(true);
      setEmail("");
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to TechPulse! Check your email for confirmation.",
      });
      
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 md:top-20 left-4 md:left-20 w-16 h-16 md:w-32 md:h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 md:bottom-20 right-4 md:right-20 w-20 h-20 md:w-40 md:h-40 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 shadow-elegant backdrop-blur-sm">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full mb-4 md:mb-6 shadow-glow">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Stay in the Tech Loop
                </h2>
                
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                  Get the latest startup news, tech trends, and exclusive insights delivered 
                  straight to your inbox. Join our community of forward-thinking professionals.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
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
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-background border-border/50 text-sm md:text-base"
                      required
                    />
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-sm md:text-base px-4 md:px-6"
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 md:mt-3 text-center px-4">
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