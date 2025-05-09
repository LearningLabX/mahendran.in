
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, FileDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const MarkdownConverter = () => {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and this is *italic*.\n\n- List item 1\n- List item 2\n\n```js\nconsole.log("Hello world!");\n```');
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const [renderMode, setRenderMode] = useState('preview');

  const convertToHtml = () => {
    // Very basic markdown to HTML conversion
    let result = markdown
      // Headers
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
      // Code blocks
      .replace(/```(.*?)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
      // Line breaks
      .replace(/\n/g, '<br>');

    setHtml(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHtml = () => {
    const element = document.createElement('a');
    const file = new Blob([html], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'converted.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Markdown to HTML Converter</CardTitle>
        <CardDescription>
          Convert Markdown text to HTML with instant preview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Markdown Input</h3>
              <Badge variant="outline">Markdown</Badge>
            </div>
            <Textarea 
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              placeholder="Enter Markdown text here..."
            />
            <Button onClick={convertToHtml} className="w-full">Convert to HTML</Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">HTML Output</h3>
              <div className="flex gap-2">
                <RadioGroup 
                  value={renderMode} 
                  onValueChange={setRenderMode}
                  className="flex items-center space-x-2"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="preview" id="preview" />
                    <Label htmlFor="preview" className="text-xs">Preview</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="code" id="code" />
                    <Label htmlFor="code" className="text-xs">Code</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <Tabs value={renderMode} onValueChange={setRenderMode} className="w-full">
              <TabsContent value="preview" className="m-0">
                {html ? (
                  <div 
                    className="border rounded-md p-4 h-[300px] overflow-auto bg-white dark:bg-slate-900"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ) : (
                  <div className="border rounded-md p-4 h-[300px] flex items-center justify-center text-muted-foreground">
                    HTML preview will appear here
                  </div>
                )}
              </TabsContent>
              <TabsContent value="code" className="m-0">
                <Textarea 
                  value={html}
                  readOnly
                  rows={12}
                  className="font-mono text-sm"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={copyToClipboard}
          className="gap-1"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy HTML'}
        </Button>
        <Button 
          variant="outline" 
          onClick={downloadHtml}
          className="gap-1"
        >
          <FileDown className="h-4 w-4" />
          Download HTML
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarkdownConverter;
