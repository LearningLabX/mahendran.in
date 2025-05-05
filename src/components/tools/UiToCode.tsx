
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Upload, Code } from 'lucide-react';

const UiToCode = () => {
  const [imageInput, setImageInput] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('flutter');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageInput(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      toast({
        title: "Image uploaded",
        description: "Your UI mockup has been uploaded successfully.",
      });
    }
  };

  const generateCode = () => {
    if (!imageInput) {
      toast({
        title: "No image uploaded",
        description: "Please upload an image of your UI design first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate code generation
    setTimeout(() => {
      const flutterCode = `
import 'package:flutter/material.dart';

class GeneratedUI extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Generated UI'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                'Hello Developer!',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {},
              child: Text('Click Me'),
            ),
          ],
        ),
      ),
    );
  }
}`;

      setGeneratedCode(flutterCode);
      setIsGenerating(false);
      toast({
        title: "Code generated",
        description: "Your UI design has been converted to code.",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Upload a screenshot or image of your UI design, and we'll convert it to Flutter code.</p>

          <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {imageInput ? (
                <div className="space-y-4 w-full">
                  <img 
                    src={imageInput} 
                    alt="Uploaded UI" 
                    className="max-h-[300px] w-full object-contain rounded-md border"
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setImageInput(null)}>
                      Remove
                    </Button>
                    <Button onClick={generateCode} disabled={isGenerating}>
                      {isGenerating ? "Generating..." : "Generate Code"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-sm text-center mb-4">Drag and drop your UI image, or click to browse</p>
                  <Button asChild>
                    <label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="sr-only"
                      />
                      Upload Image
                    </label>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="flutter">Flutter</TabsTrigger>
              <TabsTrigger value="react">React</TabsTrigger>
            </TabsList>
            
            <TabsContent value="flutter" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <Textarea 
                      value={generatedCode} 
                      readOnly 
                      className="font-mono text-sm min-h-[400px] resize-none p-4"
                      placeholder="Generated Flutter code will appear here..."
                    />
                    {generatedCode && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={copyToClipboard}
                      >
                        {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="react" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <Textarea 
                      value={activeTab === "react" ? "// React code generation requires Pro subscription" : ""}
                      readOnly 
                      className="font-mono text-sm min-h-[400px] resize-none p-4"
                      placeholder="Generated React code will appear here..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t">
        <h3 className="text-lg font-medium">Pro Features</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
          <li>Convert to React, Vue, and HTML/CSS code</li>
          <li>Higher accuracy UI detection</li>
          <li>Responsive layouts generation</li>
          <li>Custom component naming</li>
          <li>Export to project structure</li>
        </ul>
      </div>
    </div>
  );
};

export default UiToCode;
