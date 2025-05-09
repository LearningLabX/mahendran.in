import Hero from '@/components/home/Hero';
import { type BlogPost } from '@/hooks/useBlogPosts';
import ProjectCard, { type Project } from '@/components/projects/ProjectCard';
import AnimatedTechIcons from '@/components/home/AnimatedTechIcons';
import TechBlogsSection from '@/components/home/TechBlogsSection';
import TechToolFinder from '@/components/tools/TechToolFinder';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ArrowRight, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import About from '@/components/home/About';
import Navbar from '@/components/layout/Navbar';

// Sample data for featured projects
const featuredProjects: Project[] = [
  {
    id: 'health-tracker',
    title: 'Health Tracker App',
    description:
      'A comprehensive health tracking application with personalized insights and analytics.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    technologies: ['React Native', 'Firebase', 'HealthKit'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'fitness-coach',
    title: 'Fitness Coach',
    description:
      'AI-powered personal trainer app with custom workout plans and progress tracking.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    technologies: ['Flutter', 'TensorFlow', 'Firebase'],
    demoUrl: '#',
    featured: true,
  },
  {
    id: 'meal-planner',
    title: 'Meal Planner',
    description:
      'Recipe and nutrition tracking app with shopping list integration and meal scheduling.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    technologies: ['Swift', 'Core Data', 'REST API'],
    githubUrl: '#',
    featured: true,
  },
];

// Sample data for blog posts
const featuredPosts: BlogPost[] = [
  {
    id: 'react-native-tips',
    title: '10 Performance Tips for React Native Apps',
    excerpt:
      'Optimize your React Native app with these proven techniques to improve speed, reduce bundle size, and create smoother animations.',
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1', // Add image property
    date: 'Apr 15, 2023',
    category: 'React Native',
    readTime: '8 min read',
  },
  {
    id: 'flutter-vs-rn',
    title: 'Flutter vs React Native in 2023',
    excerpt:
      'An in-depth comparison of the two most popular cross-platform frameworks and which one you should choose for your next project.',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', // Add image property
    date: 'Mar 22, 2023',
    category: 'Mobile Dev',
    readTime: '12 min read',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      {/* <About /> */}
      {/* Tech Tool Finder - NEW SECTION */}
      {/* <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Mobile Dev Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the best tools, resources, and services for building
                exceptional mobile applications
              </p>
            </div>
          </AnimatedSection>
          <TechToolFinder />
        </div>
      </section> */}
      {/* Blog Section with AdSense */}
      <AnimatedSection delay={50}>
        <div className="my-8 text-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5354730220539777"
            data-ad-slot="3479208831"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
      </AnimatedSection>
      {/* <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"> */}
      {/* <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-8 bg-primary/50"></span>
                <span className="text-sm font-medium text-primary">Articles</span>
                <span className="h-px w-8 bg-primary/50"></span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Latest Articles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                  Thoughts, tutorials, and insights on mobile development.
              </p>
            </div>
          </AnimatedSection> */}

      {/* AdSense Ad */}
      {/* <AnimatedSection delay={100}>
            <div className="my-8 text-center">
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5354730220539777"
                data-ad-slot="3479208831"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
              <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
              </script>
            </div>
          </AnimatedSection> */}

      {/* Featured Blog Posts */}
      {/* <AnimatedSection delay={200} className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Featured Posts</h3>
                <p className="text-muted-foreground">
                  Handpicked articles on mobile app development
                </p>
              </div>
              <Button asChild variant="outline" className="group">
                <a href="/blog">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </AnimatedSection> */}
      {/* </div>
      </section> */}
    </div>
  );
};

export default Index;
