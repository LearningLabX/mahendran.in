import AnimatedSection from '@/components/ui/AnimatedSection';
import BlogCard from '@/components/blog/BlogCard';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { trackEvent } from '@/lib/analytics';
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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleAdsense } from '@/hooks/useGoogleAdsense';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';

// Tech categories with icons - optimized for high CPC keywords
const techCategories = [
  { name: 'All', icon: Book },
  { name: 'Android', icon: Smartphone },
  { name: 'Flutter', icon: Code },
  { name: 'iOS', icon: Apple },
  { name: 'React Native', icon: Terminal },
  { name: 'Mobile Dev', icon: Grid },
  { name: 'Finance', icon: Store }, // Added high CPC category
  { name: 'Education', icon: ShoppingBag }, // Added high CPC category
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  useGoogleAdsense(); // Hook to reinitialize ads when component mounts

  const { posts: filteredPosts } = useBlogPosts(selectedCategory);

  // Render AdSense ad
  const renderAd = () => {
    return (
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
    );
  };

  useEffect(() => {
    // Track blog page view with category filter
    trackEvent('blog_page_view', {
      category: selectedCategory || 'all',
      posts_count: filteredPosts.length,
      screen_width: window.innerWidth,
      utm_source:
        new URLSearchParams(window.location.search).get('utm_source') ||
        'direct',
    });
  }, [selectedCategory, filteredPosts.length]);

  const handleCategoryChange = (category: string) => {
    const newCategory = category === 'All' ? null : category;
    setSelectedCategory(newCategory);
    trackEvent('blog_category_filter', {
      category: newCategory || 'all',
      is_high_cpc: ['Finance', 'Education'].includes(category) ? 'yes' : 'no',
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <Navbar />

      <Helmet>
        <title>
          Mobile App Development Blog | Tips & Tutorials | Mahendran
        </title>
        <meta
          name="description"
          content="Learn mobile development tips, Flutter tutorials, React Native guides, and iOS/Android best practices for creating high-performance apps."
        />
        <meta
          name="keywords"
          content="mobile app development, Flutter tutorials, React Native tips, iOS development, Android development, app monetization"
        />
      </Helmet>

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
              development and web technologies.
            </p>
          </div>
        </AnimatedSection>

        {/* First ad placement - top of page */}
        {renderAd()}

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
                    onClick={() => handleCategoryChange(category.name)}
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
                onClick={() =>
                  trackEvent('blog_card_click', {
                    blog_id: post.id,
                    blog_title: post.title,
                    position: index,
                    current_category: selectedCategory || 'all',
                  })
                }
              >
                <BlogCard post={post} />

                {/* Insert ad after every 3rd post */}
                {(index + 1) % 3 === 0 &&
                  index !== filteredPosts.length - 1 &&
                  renderAd()}
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
                onClick={() => handleCategoryChange('All')}
                className="mt-4"
              >
                View All Posts
              </Button>
            </div>
          )}
        </AnimatedSection>

        {/* Bottom ad placement */}
        {renderAd()}
      </div>
    </div>
  );
};

export default Blog;
