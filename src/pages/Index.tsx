import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import TechBlogsSection from "@/components/home/TechBlogsSection";
import ResumeSection from "@/components/resume/ResumeSection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import BlogCard from "@/components/blog/BlogCard";
import ContactForm from "@/components/contact/ContactForm";
import { motion } from "framer-motion";
import { type BlogPost } from "@/hooks/useBlogPosts";
import { type Project } from "@/components/projects/ProjectCard";
import AnimatedTechIcons from "@/components/home/AnimatedTechIcons";

// Sample data for featured projects
const featuredProjects: Project[] = [
  {
    id: "health-tracker",
    title: "Health Tracker App",
    description: "A comprehensive health tracking application with personalized insights and analytics.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    technologies: ["React Native", "Firebase", "HealthKit"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "fitness-coach",
    title: "Fitness Coach",
    description: "AI-powered personal trainer app with custom workout plans and progress tracking.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    technologies: ["Flutter", "TensorFlow", "Firebase"],
    demoUrl: "#",
    featured: true
  },
  {
    id: "meal-planner",
    title: "Meal Planner",
    description: "Recipe and nutrition tracking app with shopping list integration and meal scheduling.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    technologies: ["Swift", "Core Data", "REST API"],
    githubUrl: "#",
    featured: true
  }
];

// Sample data for blog posts
const featuredPosts: BlogPost[] = [
  {
    id: "react-native-tips",
    title: "10 Performance Tips for React Native Apps",
    excerpt: "Optimize your React Native app with these proven techniques to improve speed, reduce bundle size, and create smoother animations.",
    coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    date: "Apr 15, 2023",
    category: "React Native",
    readTime: "8 min read"
  },
  {
    id: "flutter-vs-rn",
    title: "Flutter vs React Native in 2023",
    excerpt: "An in-depth comparison of the two most popular cross-platform frameworks and which one you should choose for your next project.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "Mar 22, 2023",
    category: "Mobile Dev",
    readTime: "12 min read"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Animated Tech Icons - NEW SECTION */}
      <AnimatedTechIcons />

      {/* About Section */}
      {/* <About /> */}

      {/* Tech Blogs Section - NEW SECTION */}
      {/* <TechBlogsSection /> */}

      {/* Featured Projects Section */}
      {/* <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Showcasing some of my best work in mobile app development,
                from concept to deployment.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="group">
                <Link to="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section> */}

      {/* Resume Preview Section */}
      {/* <ResumeSection /> */}

      {/* Blog Section */}
      {/* <section className="py-20">
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
              <span className="text-sm font-medium text-primary">Articles</span>
              <span className="h-px w-8 bg-primary/50"></span>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">My Latest Articles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Thoughts, tutorials, and insights on mobile development.
            </p>
          </div>
        </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Thoughts, tutorials, and insights on mobile development.
                </p>
              </div>
              <Button asChild variant="outline" className="group">
                <Link to="/blog">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have a project idea or need a mobile development specialist? Let's discuss how we can work together.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-xl mx-auto">
            <AnimatedSection delay={200}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Index;
