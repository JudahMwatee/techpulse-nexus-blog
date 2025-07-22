import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Tech innovation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Trending badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trending in Tech</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="block">Stay Ahead of the</span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Tech Revolution
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Get the latest insights on startups, tech innovations, and industry trends. 
            Join thousands of tech professionals who trust TechPulse for cutting-edge analysis.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group">
              Start Reading
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="group border-primary/20 hover:bg-primary/5">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border/50">
            <div className="text-center sm:text-left">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">50K+</div>
              <div className="text-muted-foreground">Active Readers</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">1.2M+</div>
              <div className="text-muted-foreground">Monthly Views</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-muted-foreground">Tech Companies Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-gradient-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-20 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;