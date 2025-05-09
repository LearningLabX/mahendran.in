
import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ChevronLeft, ChevronRight, Star, Tag, Code, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const ComponentStore = () => {
  const [category, setCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const categories = [
    { id: 'all', name: 'All Components' },
    { id: 'widgets', name: 'UI Widgets' },
    { id: 'animations', name: 'Animations' },
    { id: 'plugins', name: 'KMP Plugins' },
    { id: 'layouts', name: 'Layout Templates' },
    { id: 'navigation', name: 'Navigation' },
    { id: 'forms', name: 'Form Components' }
  ];
  
  const components = [
    {
      id: 'custom-bottom-nav',
      title: 'Custom Bottom Navigation',
      description: 'Modern animated bottom navigation bar with custom icons and indicators',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
      category: 'navigation',
      price: '$12',
      author: 'FlutterMaster',
      rating: 4.7,
      reviews: 58,
      downloads: 1250,
      tags: ['Navigation', 'Animation', 'UI'],
      previewUrl: '#',
      codePreview: `
BottomNavBar(
  items: [
    BottomNavItem(icon: Icons.home, label: 'Home'),
    BottomNavItem(icon: Icons.search, label: 'Search'),
    BottomNavItem(icon: Icons.notifications, label: 'Notifications'),
    BottomNavItem(icon: Icons.person, label: 'Profile'),
  ],
  onTap: (index) => setState(() => _selectedTab = index),
  selectedIndex: _selectedTab,
)`
    },
    {
      id: 'onboarding-animation',
      title: 'Deluxe Onboarding Animation',
      description: 'Smooth animated onboarding screens with parallax effects',
      image: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1',
      category: 'animations',
      price: '$18',
      author: 'AnimationPro',
      rating: 4.9,
      reviews: 32,
      downloads: 870,
      tags: ['Animation', 'Onboarding', 'UI'],
      previewUrl: '#',
      codePreview: `
AnimatedOnboardingPage(
  pages: [
    OnboardingPage(
      image: 'assets/onboard1.png',
      title: 'Welcome to the App',
      description: 'The best app for your daily needs',
    ),
    OnboardingPage(
      image: 'assets/onboard2.png',
      title: 'Easy to Use',
      description: 'Simple and intuitive interface',
    ),
    // More pages...
  ],
  onComplete: () => Navigator.of(context).pushReplacement(
    MaterialPageRoute(builder: (_) => HomePage())
  ),
)`
    },
    {
      id: 'material-card-carousel',
      title: 'Material Card Carousel',
      description: 'Interactive card carousel with material design principles',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c',
      category: 'widgets',
      price: '$15',
      author: 'MaterialDesigner',
      rating: 4.6,
      reviews: 45,
      downloads: 1120,
      tags: ['Carousel', 'Material', 'UI'],
      previewUrl: '#',
      codePreview: `
MaterialCardCarousel(
  height: 220,
  items: productList.map((product) => 
    MaterialCarouselCard(
      title: product.title,
      subtitle: product.subtitle,
      image: NetworkImage(product.imageUrl),
      onTap: () => navigateToProduct(product.id),
    )
  ).toList(),
  autoPlay: true,
  viewportFraction: 0.8,
)`
    },
    {
      id: 'form-validation',
      title: 'Smart Form Validation',
      description: 'Complete form validation system with animations and error handling',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      category: 'forms',
      price: '$24',
      author: 'FormMaster',
      rating: 4.8,
      reviews: 67,
      downloads: 1560,
      tags: ['Forms', 'Validation', 'UI'],
      previewUrl: '#',
      codePreview: `
SmartFormField(
  controller: emailController,
  label: 'Email Address',
  hint: 'Enter your email address',
  validator: Validators.email('Please enter a valid email'),
  prefixIcon: Icons.email,
  onChanged: (value) => updateFormState(),
  animationType: AnimationType.slide,
)`
    },
    {
      id: 'auth-biometric',
      title: 'Biometric Authentication',
      description: 'Fingerprint and Face ID authentication with fallback options',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7',
      category: 'plugins',
      price: '$32',
      author: 'SecurityPro',
      rating: 4.9,
      reviews: 41,
      downloads: 950,
      tags: ['Security', 'Authentication', 'Plugin'],
      previewUrl: '#',
      codePreview: `
BiometricAuth.authenticate(
  localizedReason: 'Authenticate to continue',
  options: BiometricOptions(
    useErrorDialogs: true,
    stickyAuth: true,
    sensitiveTransaction: true,
    biometricOnly: false,
  ),
  onSuccess: () => navigateToHome(),
  onError: (error) => handleAuthError(error),
)`
    },
    {
      id: 'responsive-grid',
      title: 'Responsive Grid System',
      description: 'Adaptive grid layout that works across all screen sizes',
      image: 'https://images.unsplash.com/photo-1551050583-9ad2d592214a',
      category: 'layouts',
      price: '$20',
      author: 'LayoutMaster',
      rating: 4.7,
      reviews: 39,
      downloads: 1080,
      tags: ['Layout', 'Responsive', 'Grid'],
      previewUrl: '#',
      codePreview: `
ResponsiveGrid(
  columnCount: ResponsiveValue(
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  ),
  spacing: 16.0,
  children: productList.map((product) => 
    ProductCard(product: product)
  ).toList(),
)`
    },
  ];
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  const filteredComponents = category === 'all' 
    ? components 
    : components.filter(c => c.category === category);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-background/95">
      <Helmet>
        <title>Component Store | Mahendran</title>
        <meta
          name="description"
          content="Browse and purchase premium Flutter UI components, animations, plugins, and more for your mobile app projects."
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-primary/50"></span>
              <span className="text-sm font-medium text-primary">Component Marketplace</span>
              <span className="h-px w-8 bg-primary/50"></span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Flutter Component Store</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover and integrate premium UI components, animations, and plugins for your Flutter projects
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-secondary/30 rounded-full px-4 py-1.5">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">Top-rated components</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/30 rounded-full px-4 py-1.5">
              <Code className="h-4 w-4" />
              <span className="text-sm font-medium">Easy integration</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/30 rounded-full px-4 py-1.5">
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Instant download</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <Tabs value={category} onValueChange={setCategory} className="w-full">
            <div className="relative mb-8">
              <div className="flex items-center justify-between mb-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm border hover:bg-secondary/80"
                  onClick={scrollLeft}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="w-full overflow-hidden mx-8" ref={scrollRef}>
                  <TabsList className="flex space-x-1 rounded-lg bg-secondary/80 p-1 overflow-x-auto w-max min-w-full">
                    {categories.map((cat) => (
                      <TabsTrigger
                        key={cat.id}
                        value={cat.id}
                        className="whitespace-nowrap"
                      >
                        {cat.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm border hover:bg-secondary/80"
                  onClick={scrollRight}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Scroll horizontally to see more categories →
                </p>
              </div>
            </div>
            
            <TabsContent value={category} className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredComponents.map((component) => (
                  <Card key={component.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <AspectRatio ratio={16/9} className="bg-muted">
                      <img 
                        src={component.image} 
                        alt={component.title} 
                        className="object-cover w-full h-full brightness-90 hover:brightness-100 transition-all duration-300"
                      />
                    </AspectRatio>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{component.title}</CardTitle>
                        <Badge variant="outline" className="font-medium">
                          {component.price}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{component.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {component.tags.map((tag, index) => (
                          <div key={index} className="bg-secondary/50 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        By <span className="font-medium">{component.author}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{component.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{component.downloads} downloads</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{component.title}</DialogTitle>
                            <DialogDescription>{component.description}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-6 py-4">
                            <div>
                              <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden">
                                <img 
                                  src={component.image} 
                                  alt={component.title} 
                                  className="object-cover w-full h-full"
                                />
                              </AspectRatio>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {component.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium mb-2">Code Preview</h3>
                              <div className="bg-secondary/20 rounded-md p-4 overflow-hidden">
                                <ScrollArea className="h-[200px]">
                                  <pre className="text-sm font-mono whitespace-pre-wrap">
                                    {component.codePreview}
                                  </pre>
                                </ScrollArea>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-1">Author</h4>
                                <p className="text-sm">{component.author}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Downloads</h4>
                                <p className="text-sm">{component.downloads}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Rating</h4>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                  <span className="text-sm">{component.rating} ({component.reviews} reviews)</span>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">License</h4>
                                <p className="text-sm">Commercial Use</p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="flex justify-between items-center">
                            <div>
                              <span className="text-lg font-bold">{component.price}</span>
                            </div>
                            <div className="flex gap-2">
                              <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                              </DialogClose>
                              <Button>Purchase Now</Button>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <div className="mt-16 text-center bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Sell Your Components</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Are you a developer with high-quality UI components or plugins? Join our marketplace
              and earn revenue from your code.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="font-medium">
                Submit Component
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                Seller Guidelines
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ComponentStore;
