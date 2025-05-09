import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import blogData from '@/data/blogPosts.json';
import { BlogPost as BlogPostType } from '@/hooks/useBlogPosts';
import ReactMarkdown from 'react-markdown';
import { trackBlogView, trackEvent } from '@/lib/analytics';
import { useGoogleAdsense } from '@/hooks/useGoogleAdsense';

const BlogPost = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<BlogPostType | null>(null);
  useGoogleAdsense(); // Hook to reinitialize ads when component mounts

  useEffect(() => {
    window.scrollTo(0, 0);

    if (blogId) {
      // Track blog post view for analytics
      trackBlogView(blogId, post?.title || 'Unknown Post');

      // Track additional engagement metrics
      trackEvent('blog_post_engagement', {
        blog_id: blogId,
        source: document.referrer || 'direct',
        screen_size: `${window.innerWidth}x${window.innerHeight}`,
      });
    }
  }, [blogId, post?.title]);

  useEffect(() => {
    const foundPost = blogData.posts.find((p) => p.id === blogId) || null;
    setPost(foundPost);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [blogId]);

  // Insert AdSense ad manually
  const renderInContentAd = () => {
    return (
      <div className="my-8 text-center ad-container">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-5354730220539777"
          data-ad-slot="3479208831"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>
    );
  };

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/blog">Return to Blog</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        >
          <div className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary" />
        </motion.div>
      </div>
    );
  }

  // Function to properly parse markdown in content
  const renderContent = () => {
    return (
      <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
        {post.content.map((paragraph, index) => {
          // Handle code blocks separately
          if (paragraph.startsWith('```')) {
            const lines = paragraph.split('\n');
            const language = lines[0].replace('```', '').trim();
            const code = lines.slice(1, -1).join('\n');

            return (
              <div
                key={index}
                className="my-6 overflow-auto rounded-lg bg-secondary/50 p-4"
              >
                <pre>
                  <code className={language ? `language-${language}` : ''}>
                    {code}
                  </code>
                </pre>
              </div>
            );
          }
          // Use ReactMarkdown for all other content
          else {
            return (
              <div key={index} className="mb-6">
                <ReactMarkdown
                  components={{
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-2xl font-bold mt-10 mb-4"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6 mb-6" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-6 mb-6" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-1" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-primary hover:underline" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto mb-6">
                        <table
                          className="min-w-full divide-y divide-gray-300"
                          {...props}
                        />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-secondary/30" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-3 text-sm" {...props} />
                    ),
                    tr: ({ node, ...props }) => (
                      <tr className="border-b" {...props} />
                    ),
                    img: ({ node, ...props }) => (
                      <img className="rounded-lg w-full my-6" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-primary/30 pl-4 italic my-6"
                        {...props}
                      />
                    ),
                  }}
                >
                  {paragraph}
                </ReactMarkdown>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-8 flex items-center group"
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </Button>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex flex-col space-y-4 mb-12">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {post.category}
              </span>
              <span className="text-muted-foreground text-sm">
                {post.date} • {post.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex items-center mt-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                {post.author?.charAt(0) || 'M'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {post.author || 'Mahendran'}
                </p>
                {/* <p className="text-xs text-muted-foreground">
                  Mobile App Developer
                </p> */}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="relative w-full h-[40vh] md:h-[60vh] rounded-xl overflow-hidden mb-16">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>{renderContent()}</AnimatedSection>

        {/* Ad before related articles */}
        {renderInContentAd()}

        <AnimatedSection delay={400}>
          <div className="mt-20 pt-12 border-t">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.values(blogData.posts)
                .filter((relatedPost) => relatedPost.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group"
                    onClick={() =>
                      trackEvent('related_post_click', {
                        from_post_id: post.id,
                        to_post_id: relatedPost.id,
                      })
                    }
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default BlogPost;
