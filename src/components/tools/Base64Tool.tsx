
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('encode');
  const [copied, setCopied] = useState(false);

  const encodeToBase64 = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const decodeFromBase64 = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleAction = () => {
    if (activeTab === 'encode') {
      encodeToBase64();
    } else {
      decodeFromBase64();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>
      </Tabs>

      <div>
        <Label htmlFor="base64-input">
          {activeTab === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
        </Label>
        <Textarea
          id="base64-input"
          placeholder={activeTab === 'encode' ? 'Enter text to encode to Base64' : 'Enter Base64 to decode'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
        />
      </div>
      
      <div className="flex space-x-2">
        <Button onClick={handleAction}>
          {activeTab === 'encode' ? 'Encode' : 'Decode'}
        </Button>
        <Button variant="outline" onClick={() => {
          setInput('');
          setOutput('');
        }}>
          Clear
        </Button>
      </div>
      
      {output && (
        <div className="border rounded-md">
          <div className="flex items-center justify-between p-2 bg-muted/50 border-b">
            <Label className="text-sm">
              {activeTab === 'encode' ? 'Encoded Base64' : 'Decoded Text'}
            </Label>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={copyToClipboard}
              className="h-8"
            >
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <div className="p-4 bg-secondary/10 overflow-auto max-h-60">
            <pre className="font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Base64Tool;
