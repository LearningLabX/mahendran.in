import AnimatedSection from '@/components/ui/AnimatedSection';
import BlogCard, { BlogPost } from '@/components/blog/BlogCard';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import {
  Book,
  Terminal,
  Code,
  Settings,
  Store,
  ShoppingBag,
  Smartphone,
  Apple,
  Grid,
  Shuffle,
  Monitor,
  Share2,
} from 'lucide-react';

import { motion } from 'framer-motion';

// Sample blog posts
const allPosts: BlogPost[] = [
  {
    id: 'native-vs-flutter',
    title: '10 Performance Tips for React Native Apps',
    excerpt:
      'Optimize your React Native app with these proven techniques to improve speed, reduce bundle size, and create smoother animations.',
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    date: 'Apr 15, 2023',
    category: 'React Native',
    readTime: '8 min read',
  },
  // {
  //   id: 'flutter-vs-rn',
  //   title: 'Flutter vs React Native in 2023',
  //   excerpt:
  //     'An in-depth comparison of the two most popular cross-platform frameworks and which one you should choose for your next project.',
  //   coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  //   date: 'Mar 22, 2023',
  //   category: 'Mobile Dev',
  //   readTime: '12 min read',
  // },
  // {
  //   id: 'swift-ui-tips',
  //   title: 'SwiftUI Tips and Tricks for Clean Architecture',
  //   excerpt:
  //     'Learn how to structure your SwiftUI projects for maximum maintainability and separation of concerns.',
  //   coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  //   date: 'Feb 10, 2023',
  //   category: 'iOS',
  //   readTime: '10 min read',
  // },
  // {
  //   id: 'jetpack-compose',
  //   title: 'Getting Started with Jetpack Compose',
  //   excerpt:
  //     "A beginner's guide to Android's modern toolkit for building native UI. Includes practical examples and best practices.",
  //   coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  //   date: 'Jan 25, 2023',
  //   category: 'Android',
  //   readTime: '15 min read',
  // },
  // {
  //   id: 'app-store-optimization',
  //   title: 'App Store Optimization Strategies That Actually Work',
  //   excerpt:
  //     "Improve your app's visibility and conversion rates with these proven ASO techniques for both Apple App Store and Google Play Store.",
  //   coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  //   date: 'Dec 12, 2022',
  //   category: 'Marketing',
  //   readTime: '11 min read',
  // },
  // {
  //   id: 'ci-cd-mobile',
  //   title: 'Setting Up CI/CD for Mobile App Development',
  //   excerpt:
  //     'A comprehensive guide to implementing continuous integration and deployment pipelines specifically for mobile applications.',
  //   coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
  //   date: 'Nov 05, 2022',
  //   category: 'DevOps',
  //   readTime: '14 min read',
  // },
  // {
  //   id: 'ar-mobile-apps',
  //   title: 'Building AR Experiences in Mobile Apps: A Complete Guide',
  //   excerpt:
  //     'Learn how to integrate augmented reality features in your mobile applications to create immersive user experiences.',
  //   coverImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620',
  //   date: 'Oct 18, 2022',
  //   category: 'AR/VR',
  //   readTime: '16 min read',
  // },
  // {
  //   id: 'mobile-design-trends',
  //   title: 'Top Mobile UI/UX Design Trends to Watch in 2023',
  //   excerpt:
  //     'Stay ahead of the curve with these emerging design patterns and user experience trends in mobile app development.',
  //   coverImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
  //   date: 'Sep 22, 2022',
  //   category: 'Design',
  //   readTime: '9 min read',
  // },
  // {
  //   id: 'ai-mobile-development',
  //   title: 'Integrating AI into Mobile Apps: Practical Applications',
  //   excerpt:
  //     'Discover how to incorporate artificial intelligence capabilities into your mobile applications for enhanced functionality.',
  //   coverImage: 'https://images.unsplash.com/photo-1677442135136-760c813028f1',
  //   date: 'Aug 15, 2022',
  //   category: 'AI',
  //   readTime: '13 min read',
  // },
];

// Tech categories with icons
const techCategories = [
  { name: 'All', icon: Book },
  { name: 'Android', icon: Smartphone },
  { name: 'Flutter', icon: Code },
  { name: 'IOS', icon: Apple },
  { name: 'Ionic', icon: Grid },
  { name: 'Google Play Store', icon: Store },
  { name: 'App Store', icon: ShoppingBag },
  { name: 'Random', icon: Shuffle },
];

// Extract unique categories
const categories = Array.from(
  new Set(allPosts.map((post) => post.category))
).sort();

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4"
            >
              DEVELOPER INSIGHTS
            </motion.span>
            <h1 className="text-5xl font-bold mb-6">Tech Blog</h1>
            <p className="text-muted-foreground">
              In-depth articles, tutorials, and insights on mobile app
              development, UX design, and emerging technologies.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mb-16">
            {techCategories.map((category, index) => {
              const isActive =
                category.name === 'All'
                  ? selectedCategory === null
                  : selectedCategory === category.name;
              const CategoryIcon = category.icon;

              return (
                <motion.div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`flex flex-col items-center justify-center p-3 h-full cursor-pointer transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary/80'
                    }`}
                    onClick={() =>
                      setSelectedCategory(
                        category.name === 'All' ? null : category.name
                      )
                    }
                  >
                    <motion.div
                      animate={{
                        scale: hoveredIndex === index || isActive ? 1.1 : 1,
                        rotate: hoveredIndex === index ? [0, 10, -5, 0] : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mb-2"
                    >
                      <CategoryIcon className="h-6 w-6" />
                    </motion.div>
                    <span className="text-xs font-medium">{category.name}</span>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                No posts matching the selected category.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="mt-4"
              >
                View All Posts
              </Button>
            </div>
          )}
        </AnimatedSection>

        {/* <AnimatedSection delay={300}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Looking for more content?
            </p>
            <Button 
              variant="default"
              size="lg"
              className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 border-0 text-white"
            >
              Subscribe to Newsletter
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </AnimatedSection> */}
      </div>
    </div>
  );
};

export default Blog;
