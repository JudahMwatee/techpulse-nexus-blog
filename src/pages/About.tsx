import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            About TechPulse Kenya – Your Trusted Tech & Innovation Hub
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
            <p className="text-lg leading-relaxed">
              At TechPulse Kenya, we're more than just a tech blog—we're a movement. Born from a passion for cutting-edge technology, digital innovation, and empowering Kenyan tech enthusiasts, we deliver insightful, actionable, and engaging content that keeps you ahead in the fast-evolving digital world.
            </p>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Who We Are</h2>
              <p className="leading-relaxed">
                We are a team of tech enthusiasts, developers, analysts, and storytellers dedicated to demystifying technology for Kenyan businesses, startups, and individuals. Whether you're a developer, entrepreneur, or tech-curious mind, we break down complex trends into digestible, practical insights.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">What We Do</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✅</span>
                  <span><strong>Latest Tech News & Trends</strong> – Stay updated with AI, blockchain, fintech, cybersecurity, and more.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✅</span>
                  <span><strong>In-Depth Guides & Tutorials</strong> – Master new tools, coding, and digital strategies.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✅</span>
                  <span><strong>Startup & Business Tech Insights</strong> – Helping Kenyan businesses leverage tech for growth.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✅</span>
                  <span><strong>Honest Gadget & Software Reviews</strong> – Unbiased opinions to guide your tech purchases.</span>
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Why Trust Us?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✔</span>
                  <span><strong>Local & Global Perspective</strong> – We blend Kenyan tech developments with worldwide innovations.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✔</span>
                  <span><strong>Expert-Backed Content</strong> – Our writers are industry professionals with hands-on experience.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✔</span>
                  <span><strong>Community-Driven</strong> – We engage with readers through forums, webinars, and social discussions.</span>
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="leading-relaxed">
                To bridge the tech knowledge gap in Kenya by providing reliable, engaging, and SEO-optimized content that educates, inspires, and drives digital transformation.
              </p>
            </section>
            
            <section className="bg-primary/5 p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Join the TechPulse Movement!</h2>
              <p className="leading-relaxed">
                Follow us on [Social Media Links] and subscribe for exclusive tech insights. Got a story or collaboration? [Contact Us]—we'd love to hear from you!
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;