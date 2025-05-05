
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Laptop, Code, Smartphone, Star, ArrowUpRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { trackEvent } from '@/lib/analytics';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  url: string;
  affiliateUrl?: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
}

const techTools: Tool[] = [
  {
    id: 'android-studio',
    name: 'Android Studio',
    description: 'The official IDE for Android development with advanced code editing, debugging, and performance tools.',
    category: 'android',
    tags: ['Android', 'IDE', 'Java', 'Kotlin'],
    rating: 4.5,
    url: 'https://developer.android.com/studio',
    pricing: 'Free',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    description: 'Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.',
    category: 'cross-platform',
    tags: ['Dart', 'UI', 'Cross-platform'],
    rating: 4.8,
    url: 'https://flutter.dev/',
    pricing: 'Free',
  },
  {
    id: 'react-native',
    name: 'React Native',
    description: 'Build mobile apps using JavaScript and React with near-native performance and look & feel.',
    category: 'cross-platform',
    tags: ['JavaScript', 'React', 'Cross-platform'],
    rating: 4.5,
    url: 'https://reactnative.dev/',
    pricing: 'Free',
  },
  {
    id: 'xcode',
    name: 'Xcode',
    description: 'Apple\'s integrated development environment for macOS, iOS, watchOS, and tvOS.',
    category: 'ios',
    tags: ['iOS', 'IDE', 'Swift', 'Objective-C'],
    rating: 4.2,
    url: 'https://developer.apple.com/xcode/',
    pricing: 'Free',
  },
  {
    id: 'visual-studio-code',
    name: 'Visual Studio Code',
    description: 'Lightweight but powerful source code editor with support for a variety of programming languages.',
    category: 'editor',
    tags: ['Editor', 'JavaScript', 'TypeScript', 'Extensions'],
    rating: 4.9,
    url: 'https://code.visualstudio.com/',
    pricing: 'Free',
  },
  {
    id: 'firebase',
    name: 'Firebase',
    description: 'Google\'s mobile platform that helps you quickly develop high-quality apps and grow your business.',
    category: 'backend',
    tags: ['Backend', 'Database', 'Authentication', 'Cloud'],
    rating: 4.7,
    url: 'https://firebase.google.com/',
    pricing: 'Freemium',
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Design, prototype, and collaborate all in the browser with this modern UI/UX tool.',
    category: 'design',
    tags: ['Design', 'UI/UX', 'Prototyping', 'Collaboration'],
    rating: 4.8,
    url: 'https://www.figma.com/',
    affiliateUrl: 'https://figma.com/referral?affiliate=mahendran',
    pricing: 'Freemium',
  },
  {
    id: 'aws-amplify',
    name: 'AWS Amplify',
    description: 'A set of tools and services that enables mobile and front-end web developers to build full-stack applications.',
    category: 'backend',
    tags: ['Cloud', 'AWS', 'Backend', 'Authentication'],
    rating: 4.4,
    url: 'https://aws.amazon.com/amplify/',
    affiliateUrl: 'https://aws.amazon.com/amplify/?ref=mahendran',
    pricing: 'Freemium',
  },
  {
    id: 'postman',
    name: 'Postman',
    description: 'API platform for building and using APIs with features for testing, documentation, and collaboration.',
    category: 'tools',
    tags: ['API', 'Testing', 'Collaboration'],
    rating: 4.6,
    url: 'https://www.postman.com/',
    pricing: 'Freemium',
  },
  {
    id: 'expo',
    name: 'Expo',
    description: 'An open-source platform for making universal React applications for Android, iOS, and the web.',
    category: 'cross-platform',
    tags: ['React Native', 'SDK', 'Development'],
    rating: 4.5,
    url: 'https://expo.dev/',
    pricing: 'Freemium',
  },
  {
    id: 'admob',
    name: 'Google AdMob',
    description: 'Mobile advertising platform that maximizes revenue from your app while providing a good user experience.',
    category: 'monetization',
    tags: ['Ads', 'Monetization', 'Revenue'],
    rating: 4.3,
    url: 'https://admob.google.com/',
    affiliateUrl: 'https://admob.google.com/home/campaigns/new/?ref=mahendran',
    pricing: 'Free',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Online payment processing for internet businesses with powerful APIs and subscription management.',
    category: 'monetization',
    tags: ['Payments', 'Billing', 'Subscriptions'],
    rating: 4.8,
    url: 'https://stripe.com/',
    affiliateUrl: 'https://stripe.com/referral?ref_code=mahendran',
    pricing: 'Paid',
  }
];

const categories = [
  { value: 'all', label: 'All Tools' },
  { value: 'android', label: 'Android Development' },
  { value: 'ios', label: 'iOS Development' },
  { value: 'cross-platform', label: 'Cross-Platform' },
  { value: 'backend', label: 'Backend & Cloud' },
  { value: 'design', label: 'Design Tools' },
  { value: 'editor', label: 'Code Editors' },
  { value: 'monetization', label: 'Monetization' },
  { value: 'tools', label: 'Other Tools' },
];

const pricingOptions = [
  { value: 'all', label: 'All Pricing' },
  { value: 'Free', label: 'Free' },
  { value: 'Freemium', label: 'Freemium' },
  { value: 'Paid', label: 'Paid' },
];

export default function TechToolFinder() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all');
  const [activeTab, setActiveTab] = useState('discover');

  const filteredTools = techTools.filter(tool => {
    const categoryMatch = selectedCategory === 'all' || tool.category === selectedCategory;
    const pricingMatch = selectedPricing === 'all' || tool.pricing === selectedPricing;
    return categoryMatch && pricingMatch;
  });

  const handleToolClick = (tool: Tool) => {
    // Track the event in analytics
    trackEvent('tool_click', {
      tool_id: tool.id,
      tool_name: tool.name,
      category: selectedCategory,
      is_affiliate: !!tool.affiliateUrl,
    });

    // Open the URL (affiliate link if available, otherwise regular URL)
    window.open(tool.affiliateUrl || tool.url, '_blank');
  };

  return (
    <AnimatedSection className="my-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Laptop className="h-5 w-5" />
            <span>Mobile Dev Tool Finder</span>
          </CardTitle>
          <CardDescription>
            Discover the best tools for mobile app development, design, and monetization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="discover">Discover Tools</TabsTrigger>
              <TabsTrigger value="favorites">Recommended</TabsTrigger>
            </TabsList>
            <TabsContent value="discover" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select value={selectedCategory} onValueChange={(value) => {
                    setSelectedCategory(value);
                    trackEvent('tool_filter_change', { filter_type: 'category', value });
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Pricing</label>
                  <Select value={selectedPricing} onValueChange={(value) => {
                    setSelectedPricing(value);
                    trackEvent('tool_filter_change', { filter_type: 'pricing', value });
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {filteredTools.map((tool) => (
                  <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <div className="flex items-center justify-between">
                        <Badge variant={
                          tool.pricing === 'Free' ? 'outline' : 
                          tool.pricing === 'Freemium' ? 'secondary' : 'default'
                        }>
                          {tool.pricing}
                        </Badge>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm ml-1">{tool.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tool.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full" 
                        onClick={() => handleToolClick(tool)}
                      >
                        {tool.affiliateUrl ? 'Get Special Offer' : 'Learn More'}
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-12">
                  <Code className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No tools found</h3>
                  <p className="text-muted-foreground">Try changing your filters</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="favorites">
              <div className="space-y-4 mt-4">
                <p className="text-muted-foreground">Top recommended tools for mobile app development and monetization:</p>
                <div className="grid grid-cols-1 gap-4">
                  {techTools
                    .filter(tool => tool.rating >= 4.7 && !!tool.affiliateUrl)
                    .map(tool => (
                      <Card key={tool.id} className="overflow-hidden border-primary/20">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-3/4 p-4">
                            <h3 className="font-medium text-lg">{tool.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm ml-1">{tool.rating.toFixed(1)}</span>
                              </div>
                              <Badge variant={
                                tool.pricing === 'Free' ? 'outline' : 
                                tool.pricing === 'Freemium' ? 'secondary' : 'default'
                              }>
                                {tool.pricing}
                              </Badge>
                            </div>
                          </div>
                          <div className="sm:w-1/4 p-4 flex items-center justify-center bg-muted/30">
                            <Button 
                              onClick={() => handleToolClick(tool)}
                              className="w-full"
                            >
                              Get Special Offer
                              <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
