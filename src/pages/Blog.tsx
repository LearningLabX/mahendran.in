
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogCard, { BlogPost } from "@/components/blog/BlogCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Sample blog posts
const allPosts: BlogPost[] = [
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
  },
  {
    id: "swift-ui-tips",
    title: "SwiftUI Tips and Tricks for Clean Architecture",
    excerpt: "Learn how to structure your SwiftUI projects for maximum maintainability and separation of concerns.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "Feb 10, 2023",
    category: "iOS",
    readTime: "10 min read"
  },
  {
    id: "jetpack-compose",
    title: "Getting Started with Jetpack Compose",
    excerpt: "A beginner's guide to Android's modern toolkit for building native UI. Includes practical examples and best practices.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    date: "Jan 25, 2023",
    category: "Android",
    readTime: "15 min read"
  },
  {
    id: "app-store-optimization",
    title: "App Store Optimization Strategies That Actually Work",
    excerpt: "Improve your app's visibility and conversion rates with these proven ASO techniques for both Apple App Store and Google Play Store.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "Dec 12, 2022",
    category: "Marketing",
    readTime: "11 min read"
  },
  {
    id: "ci-cd-mobile",
    title: "Setting Up CI/CD for Mobile App Development",
    excerpt: "A comprehensive guide to implementing continuous integration and deployment pipelines specifically for mobile applications.",
    coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    date: "Nov 05, 2022",
    category: "DevOps",
    readTime: "14 min read"
  }
];

// Extract unique categories
const categories = Array.from(new Set(allPosts.map(post => post.category))).sort();

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredPosts = selectedCategory
    ? allPosts.filter(post => post.category === selectedCategory)
    : allPosts;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-muted-foreground">
              Insights, tutorials and thoughts on mobile app development,
              UX design, and tech industry trends.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
              size="sm"
            >
              All
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
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

        <AnimatedSection delay={300}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Looking for more content?
            </p>
            <Button variant="outline">Load More Articles</Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Blog;
