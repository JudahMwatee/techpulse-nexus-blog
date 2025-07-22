import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Github, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TechPulse
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Your trusted source for tech news, startup insights, and industry trends. 
              Building the future of tech journalism.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-semibold mb-4">Content</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Latest News</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Startup Stories</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tech Trends</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Industry Reports</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Podcasts</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Advertise</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Newsletter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">RSS Feed</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">GDPR</a></li>
            </ul>
            <div className="mt-4">
              <Badge variant="outline" className="border-green-500/20 text-green-600">
                Carbon Neutral
              </Badge>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} TechPulse. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for the tech community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;