
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ExternalLink, Star } from 'lucide-react';

const Templates = () => {
  const [category, setCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'chat', name: 'Chat Apps' },
    { id: 'crm', name: 'CRM & Leads' },
    { id: 'realestate', name: 'Real Estate' },
    { id: 'auth', name: 'Auth Templates' },
    { id: 'dashboard', name: 'Admin Dashboards' }
  ];
  
  const templates = [
    {
      id: 'ecom-basic',
      title: 'E-Commerce Starter Kit',
      description: 'Complete e-commerce UI with product listings, cart, and checkout flow',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      category: 'ecommerce',
      price: '$59',
      features: ['Light & Dark mode', 'GetX State Management', 'Mock API Integration'],
      rating: 4.8,
      reviews: 42
    },
    {
      id: 'chat-deluxe',
      title: 'Chat App UI Kit',
      description: 'Modern messaging UI with bubbles, voice calls, and group chats',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      category: 'chat',
      price: '$49',
      features: ['Real-time chat UI', 'Voice/Video Call screens', 'Stories & Status'],
      rating: 4.9,
      reviews: 36
    },
    {
      id: 'crm-pro',
      title: 'CRM Dashboard Pro',
      description: 'Sales pipeline and lead management for small businesses',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      category: 'crm',
      price: '$79',
      features: ['Contact Management', 'Deal Pipeline View', 'Activity Tracking'],
      rating: 4.7,
      reviews: 28
    },
    {
      id: 'realestate-finder',
      title: 'Property Finder UI',
      description: 'Real estate app with map integration and detailed property cards',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      category: 'realestate',
      price: '$69',
      features: ['Map View Integration', 'Property Details', 'Filtering & Sorting'],
      rating: 4.6,
      reviews: 19
    },
    {
      id: 'auth-complete',
      title: 'Complete Auth Pack',
      description: 'Every authentication screen your app could need',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
      category: 'auth',
      price: '$39',
      features: ['Social Login', 'OTP Verification', 'Password Reset Flow'],
      rating: 4.9,
      reviews: 52
    },
    {
      id: 'admin-dashboard',
      title: 'Admin Dashboard Kit',
      description: 'Comprehensive admin panel with charts, tables and analytics',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      category: 'dashboard',
      price: '$89',
      features: ['10+ Chart Components', 'Data Tables', 'User Management'],
      rating: 4.8,
      reviews: 31
    },
  ];
  
  const filteredTemplates = category === 'all' 
    ? templates 
    : templates.filter(t => t.category === category);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Helmet>
        <title>UI Templates | Mahendran</title>
        <meta
          name="description"
          content="Premium Flutter UI templates and starter kits for mobile app development projects."
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-primary/50"></span>
              <span className="text-sm font-medium text-primary">Premium Templates</span>
              <span className="h-px w-8 bg-primary/50"></span>
            </div>
            <h1 className="text-4xl font-bold mb-4">UI Kits & Starter Templates</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professionally designed UI templates to kickstart your next mobile app project
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <Tabs value={category} onValueChange={setCategory} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="flex space-x-1 rounded-lg bg-secondary/80 p-1 overflow-x-auto max-w-full sm:max-w-3xl">
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
            
            <TabsContent value={category} className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <AspectRatio ratio={16/9} className="bg-muted">
                      <img 
                        src={template.image} 
                        alt={template.title} 
                        className="object-cover w-full h-full brightness-90 hover:brightness-100 transition-all duration-300"
                      />
                    </AspectRatio>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{template.title}</CardTitle>
                        <Badge variant="outline" className="font-medium">
                          {template.price}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-1">
                        {template.features.map((feature, index) => (
                          <div key={index} className="text-sm flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{template.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{template.reviews} reviews</span>
                      </div>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <div className="mt-16 text-center bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Custom Template Request</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Need a custom UI template for your specific project requirements? 
              Get in touch for a personalized solution.
            </p>
            <Button size="lg" className="font-medium">
              Request Custom Template
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Templates;
