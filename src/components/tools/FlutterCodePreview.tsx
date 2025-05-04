
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Share2, Code } from 'lucide-react';

const FlutterCodePreview = () => {
  const [code, setCode] = useState(`import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              padding: EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: Text(
                'Hello Flutter!',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24.0,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`);

  const [theme, setTheme] = useState('light');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  const { toast } = useToast();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Code copied",
      description: "Flutter code has been copied to clipboard",
    });
  };

  const handleShareClick = () => {
    // Generate shareable link (in a real app, this would create a unique link)
    const shareableLink = `https://example.com/flutter-preview?code=${encodeURIComponent(code)}`;
    navigator.clipboard.writeText(shareableLink);
    toast({
      title: "Link created",
      description: "Shareable link copied to clipboard",
    });
  };

  const insertTemplate = (template: string) => {
    let snippet = '';
    
    switch(template) {
      case 'appbar':
        snippet = `AppBar(
  title: Text('App Title'),
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
)`;
        break;
      case 'bottomnav':
        snippet = `BottomNavigationBar(
  currentIndex: 0,
  onTap: (index) {},
  items: [
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.search),
      label: 'Search',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.person),
      label: 'Profile',
    ),
  ],
)`;
        break;
      case 'textfield':
        snippet = `TextField(
  decoration: InputDecoration(
    labelText: 'Username',
    border: OutlineInputBorder(),
    prefixIcon: Icon(Icons.person),
  ),
  onChanged: (value) {},
)`;
        break;
      default:
        return;
    }
    
    setCode(currentCode => currentCode + '\n\n// New widget\n' + snippet);
  };

  // Simplified preview renderer
  const renderPreview = () => {
    // Extract component name from code
    const componentNameMatch = code.match(/class\s+(\w+)\s+extends\s+StatelessWidget|StatefulWidget/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'Flutter Component';
    
    // Extract colors from code for preview
    const primaryColorMatch = code.match(/color:\s*Colors\.(\w+)/);
    const primaryColor = primaryColorMatch ? primaryColorMatch[1] : 'blue';
    
    // Extract text from code for preview
    const textMatch = code.match(/'([^']+)'/);
    const previewText = textMatch ? textMatch[1] : 'Hello Flutter!';
    
    return (
      <div className={`w-full h-[400px] flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
        <div className="text-center p-4">
          <div className={`bg-${primaryColor}-500 text-white p-4 rounded-lg shadow-lg mb-4`}>
            <p className="font-bold text-lg">{componentName}</p>
            <div className="p-3 mt-2 bg-white bg-opacity-10 rounded">
              <p>{previewText}</p>
            </div>
          </div>
          <div className={`mt-4 p-4 border rounded-md ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-center space-x-4">
              <div className={`w-12 h-12 rounded-full bg-${primaryColor}-500 flex items-center justify-center`}>
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className={`w-12 h-12 rounded-full border-2 border-${primaryColor}-500 flex items-center justify-center`}>
                <Code className={`h-6 w-6 text-${primaryColor}-500`} />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            This is a visual representation of your Flutter code.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex items-center space-x-4">
          <Select onValueChange={insertTemplate} defaultValue="templates">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Insert Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="templates" disabled>Insert Template</SelectItem>
              <SelectItem value="appbar">AppBar</SelectItem>
              <SelectItem value="bottomnav">Bottom Navigation</SelectItem>
              <SelectItem value="textfield">TextField</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="theme-mode">Dark Theme</Label>
            <Switch 
              id="theme-mode"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCopyClick}
          >
            {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            Copy Code
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShareClick}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="code">Code Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="code" className="p-0 mt-2">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm min-h-[400px] resize-none"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="p-0 mt-2">
          <Card className="border">
            <CardContent className="p-0">
              {renderPreview()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlutterCodePreview;
