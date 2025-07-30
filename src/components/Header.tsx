import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Menu, User, Bell, Moon, Sun, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Call the actual newsletter subscription edge function
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email }
      });

      if (error) {
        throw error;
      }
      
      setEmail("");
      setIsDialogOpen(false);
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
      setIsSubscribing(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b shadow-card' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <img 
              src="/lovable-uploads/80c993d6-387a-4553-85c2-c98311755584.png" 
              alt="TechPulse Digital Village" 
              className="h-12 w-auto md:h-16 lg:h-20"
            />
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-primary hidden sm:block">TechPulse</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">Home</a>
            <a href="/startups" className="text-muted-foreground hover:text-primary transition-colors">Startups</a>
            <a href="/tech-news" className="text-muted-foreground hover:text-primary transition-colors">Tech News</a>
            <a href="/trends" className="text-muted-foreground hover:text-primary transition-colors">Trends</a>
            <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-3">
            <Button variant="ghost" size="icon" className="hover:bg-muted hidden sm:flex">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="hover:bg-muted hidden sm:flex">
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hover:bg-muted">
              {darkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="hover:bg-muted hidden sm:flex">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="hidden md:flex bg-gradient-primary hover:shadow-glow transition-all duration-300 text-sm px-3 py-2">
                  Subscribe
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Subscribe to TechPulse
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Get the latest tech news and startup insights delivered to your inbox.
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubscribing}
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;