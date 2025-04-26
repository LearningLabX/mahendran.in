import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type FullBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  date: string;
  category: string;
  readTime: string;
  author?: string;
  hasCodeSnippets?: boolean;
};

const blogPostsData: Record<string, FullBlogPost> = {
  "native-vs-flutter": {
    id: "native-vs-flutter",
    title: "React Native vs Flutter: The Ultimate Comparison for 2025",
    excerpt: "An in-depth comparison of the two most popular cross-platform frameworks and which one you should choose for your next project.",
    content: [
      "Mobile app development has evolved tremendously over the past decade, with cross-platform frameworks taking center stage in helping developers build applications that work seamlessly across iOS and Android. Among these frameworks, React Native and Flutter have emerged as the two most popular choices in 2025.",
      "## Performance Considerations",
      "When it comes to performance, Flutter has a slight edge with its Dart compilation to native code and its own rendering engine. React Native, on the other hand, relies on a JavaScript bridge to communicate with native components, which can introduce performance bottlenecks in complex applications.",
      "```dart\n// Flutter example: Smooth 60fps animations\nAnimationController controller = AnimationController(\n  duration: const Duration(seconds: 2),\n  vsync: this,\n);\n```",
      "```javascript\n// React Native animation\nimport Animated from 'react-native';\n\nconst fadeAnim = useRef(new Animated.Value(0)).current;\n\nAnimated.timing(fadeAnim, {\n  toValue: 1,\n  duration: 1000,\n  useNativeDriver: true, // This is crucial for performance\n}).start();\n```",
      "## Developer Experience",
      "React Native benefits from JavaScript's widespread use and the massive React ecosystem. If you're already familiar with React for web development, the learning curve is minimal. Flutter uses Dart, a less common language, but one that's specifically optimized for UI development.",
      "The Hot Reload feature in both frameworks significantly speeds up development by allowing you to see changes immediately without losing the application state. However, Flutter's Hot Reload is generally more reliable and faster.",
      "## UI Components and Customization",
      "Flutter excels in UI consistency across platforms with its comprehensive set of widgets that follow Material Design and Cupertino aesthetics. React Native uses platform-native components, which ensures your app looks and feels native on each platform but can lead to inconsistencies.",
      "For custom UI elements, Flutter offers more control as you can manipulate every pixel on the screen, while React Native might require native modules or third-party libraries for complex UI elements.",
      "## Community and Ecosystem",
      "React Native has been around longer and benefits from a larger community and more mature third-party libraries. However, Flutter's ecosystem is growing rapidly, with Google's strong backing ensuring high-quality official packages.",
      "## Conclusion",
      "Both React Native and Flutter are excellent choices for cross-platform development in 2025. Your decision should be based on your specific project requirements:",
      "- Choose **React Native** if you value JavaScript ecosystem integration, have a team experienced with React, or need to integrate extensively with existing native code.",
      "- Choose **Flutter** if you prioritize consistent UI across platforms, value performance in graphics-intensive applications, or prefer a more comprehensive framework with fewer third-party dependencies.",
      "As with many technology choices, there's no one-size-fits-all answer. The best framework for your project depends on your team's expertise, project requirements, and long-term maintenance considerations."
    ],
    coverImage: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=870&q=80",
    date: "Apr 15, 2025",
    category: "Development",
    readTime: "12 min read",
    author: "Mahendran"
  },
  "ar-mobile-apps": {
    id: "ar-mobile-apps",
    title: "Building AR Experiences in Mobile Apps: A Complete Guide",
    excerpt: "Learn how to integrate augmented reality features in your mobile applications to create immersive user experiences.",
    content: [
      "Augmented Reality (AR) has transformed from a futuristic concept to a practical tool that mobile developers can implement in their applications today. This guide will walk you through the essentials of building compelling AR experiences for mobile apps in 2025.",
      "## AR Technologies Overview",
      "The landscape of AR development has evolved significantly, with several frameworks now available:",
      "- **ARKit (iOS)**: Apple's platform for iOS devices, offering powerful features like motion tracking, environment understanding, and people occlusion.",
      "- **ARCore (Android)**: Google's equivalent for Android devices, with similar capabilities to ARKit.",
      "- **React Native AR**: For cross-platform development using familiar React Native syntax.",
      "- **Unity AR Foundation**: A comprehensive framework that works across multiple platforms.",
      "## Getting Started with AR Development",
      "The first step in AR development is understanding how to track the real world and place virtual content within it. This involves concepts like world tracking, plane detection, and anchors.",
      "## Building Your First AR Feature",
      "Let's look at a simple example of placing a 3D object in the real world using ARKit:",
      "```swift\nimport ARKit\n\nclass ARViewController: UIViewController, ARSCNViewDelegate {\n    @IBOutlet var sceneView: ARSCNView!\n    \n    override func viewDidLoad() {\n        super.viewDidLoad()\n        \n        // Set the view's delegate\n        sceneView.delegate = self\n        \n        // Create a new scene\n        let scene = SCNScene()\n        \n        // Set the scene to the view\n        sceneView.scene = scene\n    }\n    \n    override func viewWillAppear(_ animated: Bool) {\n        super.viewWillAppear(animated)\n        \n        // Create a session configuration\n        let configuration = ARWorldTrackingConfiguration()\n        \n        // Run the view's session\n        sceneView.session.run(configuration)\n    }\n}\n```",
      "## User Experience in AR",
      "Creating intuitive AR experiences requires careful attention to user interaction patterns. Traditional touch interfaces need to be rethought when users are interacting with 3D objects in space.",
      "## Testing and Optimization",
      "AR applications can be resource-intensive. Optimizing for performance is crucial, especially considering the variety of devices your users might have.",
      "## Conclusion",
      "AR offers exciting possibilities for mobile app developers looking to create innovative and engaging user experiences. As the technology continues to mature, we can expect even more powerful tools and capabilities to become available."
    ],
    coverImage: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=870&q=80",
    date: "Mar 10, 2025",
    category: "AR/VR",
    readTime: "16 min read",
    author: "Mahendran"
  },
  "flutter-bloc-guide": {
    id: "flutter-bloc-guide",
    title: "Flutter BLoC Pattern: A Comprehensive Guide with Examples",
    excerpt: "Learn how to implement the BLoC pattern in Flutter for effective state management with practical code examples.",
    content: [
      "State management is crucial in Flutter applications, and the BLoC pattern has emerged as one of the most popular solutions. This guide will walk you through implementing BLoC in your Flutter projects.",
      "## Understanding BLoC Pattern",
      "The BLoC pattern separates business logic from UI components, making your code more maintainable and testable.",
      "```dart\n// Example BLoC implementation\nimport 'package:flutter_bloc/flutter_bloc.dart';\n\nenum CounterEvent { increment, decrement }\n\nclass CounterBloc extends Bloc<CounterEvent, int> {\n  CounterBloc() : super(0) {\n    on<CounterEvent>((event, emit) {\n      switch (event) {\n        case CounterEvent.increment:\n          emit(state + 1);\n          break;\n        case CounterEvent.decrement:\n          emit(state - 1);\n          break;\n      }\n    });\n  }\n}\n```",
      "## Using BLoC in Widget Tree",
      "```dart\nclass CounterPage extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return BlocProvider(\n      create: (_) => CounterBloc(),\n      child: CounterView(),\n    );\n  }\n}\n\nclass CounterView extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: Text('Counter')),\n      body: BlocBuilder<CounterBloc, int>(\n        builder: (context, count) {\n          return Center(\n            child: Text('$count'),\n          );\n        },\n      ),\n      floatingActionButton: Column(\n        crossAxisAlignment: CrossAxisAlignment.end,\n        mainAxisAlignment: MainAxisAlignment.end,\n        children: [\n          FloatingActionButton(\n            child: Icon(Icons.add),\n            onPressed: () => context\n                .read<CounterBloc>()\n                .add(CounterEvent.increment),\n          ),\n        ],\n      ),\n    );\n  }\n}\n```",
      "## Best Practices",
      "When implementing BLoC pattern, follow these best practices:",
      "1. Keep your BLoCs focused and single-purpose",
      "2. Use events for all state changes",
      "3. Keep the state immutable",
      "4. Write comprehensive tests for your BLoCs"
    ],
    coverImage: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&w=870&q=80",
    date: "Apr 20, 2025",
    category: "Flutter",
    readTime: "15 min read",
    author: "Mahendran",
    hasCodeSnippets: true
  },
  "flutter-animations": {
    id: "flutter-animations",
    title: "Creating Smooth Animations in Flutter: Tips & Tricks",
    excerpt: "Master Flutter animations with practical examples and performance optimization techniques.",
    content: [
      "Flutter's animation system is powerful and flexible. Let's explore how to create smooth, performant animations that enhance your app's user experience.",
      "## Basic Animations with AnimationController",
      "```dart\nclass _AnimatedBoxState extends State<AnimatedBox>\n    with SingleTickerProviderStateMixin {\n  late AnimationController _controller;\n  late Animation<double> _animation;\n\n  @override\n  void initState() {\n    super.initState();\n    _controller = AnimationController(\n      duration: const Duration(seconds: 2),\n      vsync: this,\n    );\n    \n    _animation = Tween<double>(\n      begin: 0,\n      end: 1,\n    ).animate(CurvedAnimation(\n      parent: _controller,\n      curve: Curves.easeInOut,\n    ));\n    \n    _controller.repeat(reverse: true);\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return AnimatedBuilder(\n      animation: _animation,\n      builder: (context, child) {\n        return Transform.scale(\n          scale: _animation.value,\n          child: Container(\n            width: 100,\n            height: 100,\n            color: Colors.blue,\n          ),\n        );\n      },\n    );\n  }\n\n  @override\n  void dispose() {\n    _controller.dispose();\n    super.dispose();\n  }\n}\n```",
      "## Hero Animations",
      "```dart\nHero(\n  tag: 'imageHero',\n  child: Image.network(\n    'https://example.com/image.jpg',\n    width: 100,\n    height: 100,\n  ),\n)\n```",
      "## Performance Tips",
      "1. Use RepaintBoundary for complex animations",
      "2. Keep animations smooth by running them on the GPU",
      "3. Use const constructors where possible",
      "4. Profile your animations using Flutter DevTools"
    ],
    coverImage: "https://images.unsplash.com/photo-1596443686812-2f45229eebc3?auto=format&fit=crop&w=870&q=80",
    date: "Apr 18, 2025",
    category: "Flutter",
    readTime: "12 min read",
    author: "Mahendran",
    hasCodeSnippets: true
  }
};

const BlogPost = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const post = blogId ? blogPostsData[blogId] : null;
  
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
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        >
          <div className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary" />
        </motion.div>
      </div>
    );
  }

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
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl">
              {post.excerpt}
            </p>
            
            <div className="flex items-center mt-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                {post.author?.charAt(0) || 'M'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{post.author || 'Mahendran'}</p>
                <p className="text-xs text-muted-foreground">Mobile App Developer</p>
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

        <AnimatedSection delay={300}>
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('```')) {
                const language = paragraph.split('\n')[0].replace('```', '');
                const code = paragraph.split('\n').slice(1, -1).join('\n');
                return (
                  <div key={index} className="my-6 overflow-auto rounded-lg bg-secondary/50 p-4">
                    <pre><code>{code}</code></pre>
                  </div>
                );
              } else {
                return <p key={index} className="mb-6 leading-relaxed">{paragraph}</p>;
              }
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="mt-20 pt-12 border-t">
            <h3 className="text-2xl font-bold mb-8 text-center">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.values(blogPostsData)
                .filter(relatedPost => relatedPost.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group"
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
                        <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">{relatedPost.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
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
