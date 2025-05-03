
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Share2, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type TechCategory = 'frontend' | 'backend' | 'database' | 'auth' | 'analytics' | 'deployment';

interface TechOption {
  id: string;
  name: string;
  category: TechCategory;
  description: string;
  strength?: string;
  weakness?: string;
  complementsWell?: string[];
  icon?: string;
}

const techOptions: TechOption[] = [
  // Frontend
  { id: 'flutter', name: 'Flutter', category: 'frontend', description: 'Google\'s UI toolkit for building natively compiled applications', strength: 'Cross-platform with single codebase', weakness: 'Larger app size than native', complementsWell: ['firebase', 'supabase']},
  { id: 'react-native', name: 'React Native', category: 'frontend', description: 'Facebook\'s framework for building native apps with React', strength: 'JavaScript ecosystem and NPM', weakness: 'Performance issues with complex animations', complementsWell: ['node', 'mongodb']},
  { id: 'native-android', name: 'Native Android', category: 'frontend', description: 'Kotlin/Java development for Android devices', strength: 'Best performance for Android', weakness: 'Platform specific', complementsWell: ['firebase', 'aws']},
  { id: 'native-ios', name: 'Native iOS', category: 'frontend', description: 'Swift/Objective-C development for Apple devices', strength: 'Best performance for iOS', weakness: 'Platform specific', complementsWell: ['firebase', 'aws']},
  
  // Backend
  { id: 'firebase', name: 'Firebase', category: 'backend', description: 'Google\'s mobile and web application development platform', strength: 'Quick setup, managed infrastructure', weakness: 'Limited customization, potential lock-in', complementsWell: ['flutter', 'react-native']},
  { id: 'node', name: 'Node.js', category: 'backend', description: 'JavaScript runtime for server-side applications', strength: 'JavaScript throughout stack', weakness: 'Single-threaded for CPU-intensive tasks', complementsWell: ['react-native', 'mongodb']},
  { id: 'django', name: 'Django', category: 'backend', description: 'Python-based web framework', strength: 'Robust, built-in admin panel', weakness: 'Heavier than some alternatives', complementsWell: ['flutter', 'postgresql']},
  { id: 'laravel', name: 'Laravel', category: 'backend', description: 'PHP-based web application framework', strength: 'Elegant syntax, powerful tools', weakness: 'PHP performance limitations', complementsWell: ['flutter', 'mysql']},
  
  // Database
  { id: 'firestore', name: 'Firestore', category: 'database', description: 'NoSQL cloud database from Firebase', strength: 'Real-time sync, offline support', weakness: 'Complex querying, pricing at scale', complementsWell: ['firebase', 'flutter']},
  { id: 'mongodb', name: 'MongoDB', category: 'database', description: 'Document-based NoSQL database', strength: 'Flexible schema, horizontal scaling', weakness: 'Less suitable for relational data', complementsWell: ['node', 'react-native']},
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', description: 'Advanced open source relational database', strength: 'ACID compliant, extensible', weakness: 'More complex to set up than some NoSQL', complementsWell: ['django', 'supabase']},
  { id: 'mysql', name: 'MySQL', category: 'database', description: 'Popular open source relational database', strength: 'Widely supported, good performance', weakness: 'Less feature-rich than PostgreSQL', complementsWell: ['laravel', 'php']},
  
  // Auth
  { id: 'firebase-auth', name: 'Firebase Auth', category: 'auth', description: 'Authentication service from Firebase', strength: 'Multiple auth providers, easy setup', weakness: 'Limited customization', complementsWell: ['firebase', 'flutter']},
  { id: 'auth0', name: 'Auth0', category: 'auth', description: 'Identity platform for web, mobile and legacy apps', strength: 'Enterprise features, rule-based flows', weakness: 'Price increases with user volume', complementsWell: ['node', 'react-native']},
  { id: 'cognito', name: 'AWS Cognito', category: 'auth', description: 'User identity and data synchronization from AWS', strength: 'AWS ecosystem integration', weakness: 'Complex setup compared to alternatives', complementsWell: ['aws', 'native-ios']},
  
  // Analytics
  { id: 'firebase-analytics', name: 'Firebase Analytics', category: 'analytics', description: 'Free, unlimited app analytics from Google', strength: 'Deeply integrated with Firebase', weakness: 'Less customizable than GA4', complementsWell: ['firebase', 'flutter']},
  { id: 'amplitude', name: 'Amplitude', category: 'analytics', description: 'Product analytics platform', strength: 'User journey and retention focus', weakness: 'Expensive at scale', complementsWell: ['react-native', 'node']},
  { id: 'mixpanel', name: 'Mixpanel', category: 'analytics', description: 'Event-based analytics platform', strength: 'Powerful segmentation', weakness: 'Learning curve for advanced usage', complementsWell: ['native-android', 'native-ios']},
  
  // Deployment
  { id: 'appstore', name: 'App Store', category: 'deployment', description: 'Apple\'s official app distribution platform', strength: 'Required for iOS distribution', weakness: 'Review process can be lengthy', complementsWell: ['native-ios', 'flutter']},
  { id: 'playstore', name: 'Play Store', category: 'deployment', description: 'Google\'s official app distribution platform', strength: 'Required for wide Android distribution', weakness: 'Less stringent review process', complementsWell: ['native-android', 'flutter']},
  { id: 'github-actions', name: 'GitHub Actions', category: 'deployment', description: 'CI/CD platform integrated with GitHub', strength: 'Free for open source, tight GitHub integration', weakness: 'Limited minutes for private repos', complementsWell: ['flutter', 'react-native']},
  { id: 'fastlane', name: 'Fastlane', category: 'deployment', description: 'Open source app automation and deployment', strength: 'Highly customizable, active community', weakness: 'Setup complexity for advanced usage', complementsWell: ['native-ios', 'native-android']},
];

const categoryLabels: Record<TechCategory, string> = {
  'frontend': 'Frontend Framework',
  'backend': 'Backend Services',
  'database': 'Database',
  'auth': 'Authentication',
  'analytics': 'Analytics',
  'deployment': 'Deployment'
};

const AppStackBuilder = () => {
  const [selectedTech, setSelectedTech] = useState<Record<TechCategory, string | null>>({
    frontend: null,
    backend: null,
    database: null,
    auth: null,
    analytics: null,
    deployment: null
  });
  
  const [currentCategory, setCurrentCategory] = useState<TechCategory>('frontend');
  const [stackComplete, setStackComplete] = useState(false);
  
  const handleSelectTech = (tech: TechOption) => {
    const newSelection = { ...selectedTech, [tech.category]: tech.id };
    setSelectedTech(newSelection);
    
    // Move to next category if available
    const categories = Object.keys(categoryLabels) as TechCategory[];
    const currentIndex = categories.indexOf(currentCategory);
    
    if (currentIndex < categories.length - 1) {
      setCurrentCategory(categories[currentIndex + 1]);
    } else {
      // Check if stack is complete
      const hasAllRequired = selectedTech.frontend && selectedTech.backend && selectedTech.database;
      if (hasAllRequired) {
        setStackComplete(true);
      }
    }
  };
  
  const handleClearSelection = (category: TechCategory) => {
    setSelectedTech({ ...selectedTech, [category]: null });
  };
  
  const handleStartOver = () => {
    setSelectedTech({
      frontend: null,
      backend: null,
      database: null,
      auth: null,
      analytics: null,
      deployment: null
    });
    setCurrentCategory('frontend');
    setStackComplete(false);
  };
  
  const getSelectedTechName = (category: TechCategory) => {
    const techId = selectedTech[category];
    if (!techId) return null;
    
    const tech = techOptions.find(t => t.id === techId);
    return tech ? tech.name : null;
  };
  
  const getCategoryOptions = (category: TechCategory) => {
    return techOptions.filter(tech => tech.category === category);
  };
  
  const getStackDescription = () => {
    const frontendName = getSelectedTechName('frontend') || '';
    const backendName = getSelectedTechName('backend') || '';
    const dbName = getSelectedTechName('database') || '';
    
    let appType = '';
    if (selectedTech.frontend === 'flutter') appType = 'Cross-Platform';
    else if (selectedTech.frontend === 'react-native') appType = 'Cross-Platform JavaScript';
    else if (selectedTech.frontend === 'native-android') appType = 'Android Native';
    else if (selectedTech.frontend === 'native-ios') appType = 'iOS Native';
    
    let backendType = '';
    if (selectedTech.backend === 'firebase') backendType = 'Serverless';
    else backendType = 'Custom Backend';
    
    return `${appType} ${backendType} Stack`;
  };
  
  const getCompatibilityScore = () => {
    let score = 0;
    let totalPairs = 0;
    
    // Check each pair of selected technologies for compatibility
    Object.entries(selectedTech).forEach(([cat1, techId1]) => {
      if (!techId1) return;
      
      Object.entries(selectedTech).forEach(([cat2, techId2]) => {
        if (!techId2 || cat1 === cat2) return;
        
        const tech1 = techOptions.find(t => t.id === techId1);
        
        if (tech1?.complementsWell?.includes(techId2)) {
          score += 1;
        }
        
        totalPairs += 1;
      });
    });
    
    // Calculate percentage if there are pairs to check
    if (totalPairs === 0) return 0;
    return Math.round((score / totalPairs) * 100);
  };
  
  // Count how many technologies are selected
  const selectedCount = Object.values(selectedTech).filter(Boolean).length;
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">App Stack Builder</h3>
        <p className="text-muted-foreground">
          Design your ideal mobile app technology stack
        </p>
      </div>
      
      {stackComplete ? (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Your App Stack</h3>
            <p className="text-lg">{getStackDescription()}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(selectedTech).map(([category, techId]) => {
              if (!techId) return null;
              
              const tech = techOptions.find(t => t.id === techId);
              if (!tech) return null;
              
              return (
                <Card key={category} className="overflow-hidden">
                  <div className="p-1 bg-primary/10">
                    <div className="text-xs font-medium text-primary px-2 py-1">
                      {categoryLabels[category as TechCategory]}
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="font-medium">{tech.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{tech.description}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Card className="overflow-hidden">
            <div className="p-2 bg-primary/10 flex justify-between items-center">
              <div className="font-medium px-2">Stack Compatibility Score</div>
              <Badge variant={getCompatibilityScore() > 70 ? "default" : "outline"}>
                {getCompatibilityScore()}%
              </Badge>
            </div>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${getCompatibilityScore()}%` }}
                  />
                </div>
                <div className="text-sm">
                  {getCompatibilityScore() > 80 
                    ? 'Excellent compatibility between technologies!'
                    : getCompatibilityScore() > 60
                    ? 'Good compatibility, with room for improvement.'
                    : 'Consider revising some choices for better compatibility.'}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button onClick={handleStartOver}>
              Build Another Stack
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium">
              Building Your Stack ({selectedCount}/6)
            </h3>
            {selectedCount > 0 && (
              <Button variant="outline" onClick={handleStartOver} size="sm">
                Start Over
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {(Object.keys(categoryLabels) as TechCategory[]).map((category) => (
              <Button
                key={category}
                variant={currentCategory === category ? "default" : "outline"}
                className={cn(
                  "justify-between",
                  selectedTech[category] ? "border-primary" : ""
                )}
                onClick={() => setCurrentCategory(category)}
              >
                <span>{categoryLabels[category]}</span>
                {selectedTech[category] ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : null}
              </Button>
            ))}
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">
                Select {categoryLabels[currentCategory]}
              </h4>
              {selectedTech[currentCategory] && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleClearSelection(currentCategory)}
                >
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getCategoryOptions(currentCategory).map((tech) => (
                <Button
                  key={tech.id}
                  variant={selectedTech[currentCategory] === tech.id ? "default" : "outline"}
                  className="justify-start h-auto py-3"
                  onClick={() => handleSelectTech(tech)}
                >
                  <div className="text-left">
                    <div className="font-medium">{tech.name}</div>
                    <div className="text-xs opacity-80 mt-1">{tech.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          {selectedTech[currentCategory] && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <Tabs defaultValue="strength">
                  <TabsList className="mb-4">
                    <TabsTrigger value="strength">Strength</TabsTrigger>
                    <TabsTrigger value="weakness">Weakness</TabsTrigger>
                    <TabsTrigger value="compatibility">Works Well With</TabsTrigger>
                  </TabsList>
                  <TabsContent value="strength">
                    <div className="text-sm">
                      {techOptions.find(t => t.id === selectedTech[currentCategory])?.strength || 'No specific strengths listed.'}
                    </div>
                  </TabsContent>
                  <TabsContent value="weakness">
                    <div className="text-sm">
                      {techOptions.find(t => t.id === selectedTech[currentCategory])?.weakness || 'No specific weaknesses listed.'}
                    </div>
                  </TabsContent>
                  <TabsContent value="compatibility">
                    <div className="text-sm">
                      {(() => {
                        const tech = techOptions.find(t => t.id === selectedTech[currentCategory]);
                        if (!tech?.complementsWell?.length) return 'No specific compatibility information.';
                        
                        const complementaryTechs = tech.complementsWell.map(id => 
                          techOptions.find(t => t.id === id)?.name
                        ).filter(Boolean);
                        
                        return complementaryTechs.join(', ');
                      })()}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-end">
            <Button 
              disabled={!selectedTech.frontend || !selectedTech.backend || !selectedTech.database}
              onClick={() => setStackComplete(true)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Generate Stack Report
            </Button>
          </div>
          
          {(!selectedTech.frontend || !selectedTech.backend || !selectedTech.database) && (
            <div className="text-sm text-muted-foreground mt-2 text-center">
              Frontend, backend and database selections are required to generate your report.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppStackBuilder;
