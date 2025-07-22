import { Button } from "@/components/ui/button";
import { Search, Menu, User, Bell, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b shadow-card' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TechPulse
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Home</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Startups</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tech News</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Trends</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <Search className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <Bell className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hover:bg-muted">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <User className="w-5 h-5" />
            </Button>
            
            <Button className="hidden sm:flex bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Subscribe
            </Button>

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