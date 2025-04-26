import { ArrowRight, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

// Tech blog posts data
const techPosts = [
  {
    id: "flutter-bloc-guide",
    title: "Flutter BLoC Pattern: A Comprehensive Guide",
    category: "Flutter",
    image: "https://images.unsplash.com/photo-1553481187-be93c21490a9",
    gradient: "from-blue-500 to-purple-600",
    hasCodeSnippets: true
  },
  {
    id: "flutter-animations",
    title: "Creating Smooth Animations in Flutter",
    category: "Flutter",
    image: "https://images.unsplash.com/photo-1596443686812-2f45229eebc3",
    gradient: "from-green-500 to-emerald-700",
    hasCodeSnippets: true
  },
  {
    id: "mobile-design-trends",
    title: "Top Mobile UI/UX Design Trends to Watch in 2025",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=870&q=80",
    gradient: "from-orange-400 to-pink-600"
  },
  {
    id: "ai-mobile-development",
    title: "Integrating AI into Mobile Apps: Practical Applications",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442135136-760c813028f1?auto=format&fit=crop&w=870&q=80",
    gradient: "from-purple-500 to-indigo-700"
  }
];

export default function TechBlogsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <span className="h-px w-8 bg-primary/50"></span>
              <span className="text-sm font-medium text-primary">TECH INSIGHTS</span>
              <span className="h-px w-8 bg-primary/50"></span>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">Tech Deep Dives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Exploring the latest technologies, frameworks, and best practices in mobile app development.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {techPosts.map((post, index) => (
            <AnimatedSection key={post.id} variant="zoom" delay={index * 100}>
              <Link to={`/blog/${post.id}`}>
                <Card className="overflow-hidden h-[350px] group relative border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${post.gradient} mix-blend-soft-light opacity-90 z-0`}
                  />
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="h-full flex flex-col justify-end p-6 relative z-20">
                    <div className="mb-auto space-y-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                        {post.category}
                      </span>
                      {post.hasCodeSnippets && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 backdrop-blur-sm text-white flex items-center gap-1 w-fit">
                          <Code size={12} />
                          Tutorial
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <span className="mr-2">Read Article</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400}>
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/blog">
                Explore All Tech Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
