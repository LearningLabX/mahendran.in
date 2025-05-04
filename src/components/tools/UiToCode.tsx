
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Upload, Code, Lightbulb } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const UiToCode = () => {
  const [image, setImage] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState('upload');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const handleGenerateCode = () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload a UI mockup image first",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // This is a mock implementation since we're just simulating the AI code generation
    setTimeout(() => {
      // Generate Flutter code based on a demo template
      const demoCode = `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Generated UI'),
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {},
          ),
          IconButton(
            icon: Icon(Icons.more_vert),
            onPressed: () {},
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Welcome Back!',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 24),
            _buildCard(
              'Today's Tasks',
              'You have 3 tasks remaining',
              Icons.task_alt,
              Colors.blue,
            ),
            SizedBox(height: 16),
            _buildCard(
              'Project Updates',
              'Design review scheduled at 2 PM',
              Icons.update,
              Colors.green,
            ),
            SizedBox(height: 16),
            _buildCard(
              'Team Meeting',
              'Join the daily standup at 10 AM',
              Icons.people,
              Colors.orange,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {},
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
  
  Widget _buildCard(String title, String subtitle, IconData icon, Color color) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(
                icon,
                color: color,
                size: 28,
              ),
            ),
            SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios,
              size: 16,
              color: Colors.grey[400],
            ),
          ],
        ),
      ),
    );
  }
}`;
  
      setCode(demoCode);
      setActiveTab('code');
      setLoading(false);
      
      toast({
        title: "Code generated",
        description: "Flutter code has been generated based on your UI mockup",
      });
    }, 3000);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Code copied",
      description: "Generated code has been copied to clipboard",
    });
  };

  return (
    <div className="space-y-4">
      <Alert variant="default">
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Pro Feature</AlertTitle>
        <AlertDescription>
          This is a demonstration of AI-powered UI-to-code conversion. In the complete version, our AI analyzes your UI mockups to generate accurate Flutter code.
        </AlertDescription>
      </Alert>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Design</TabsTrigger>
          <TabsTrigger value="code" disabled={!code}>Generated Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="p-0 mt-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="ui-image">Upload UI Mockup:</Label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 py-10 px-6">
                <div className="text-center">
                  {image ? (
                    <div className="space-y-4">
                      <img 
                        src={image} 
                        alt="UI Mockup" 
                        className="mx-auto h-64 object-contain"
                      />
                      <Button variant="outline" onClick={() => setImage(null)}>
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="flex flex-col text-sm text-muted-foreground">
                        <label 
                          htmlFor="file-upload" 
                          className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p>or drag and drop (PNG, JPG up to 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={handleGenerateCode} 
                disabled={!image || loading}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    Generating code...
                  </div>
                ) : (
                  <>
                    <Code className="mr-2 h-4 w-4" />
                    Generate Flutter Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="p-0 mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-medium">Generated Flutter Code</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleCopyClick}
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
              
              <Textarea 
                value={code} 
                readOnly 
                className="font-mono text-sm min-h-[400px] border"
              />
              
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('upload')}
                >
                  Back to Upload
                </Button>
                <Button
                  onClick={handleCopyClick}
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-2 pt-4 border-t">
        <h3 className="text-md font-medium">How It Works:</h3>
        <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2 pl-2">
          <li>Upload a clear image of your UI design or mockup</li>
          <li>Our AI analyzes the design elements, layout, and styling</li>
          <li>Clean Flutter code is generated that can be used in your app</li>
          <li>Edit the generated code to fine-tune the implementation</li>
        </ol>
      </div>
    </div>
  );
};

export default UiToCode;
