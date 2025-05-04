
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, ArrowDown, FileJson } from 'lucide-react';

const JsonFormatterTool = () => {
  const [input, setInput] = useState('{"name":"John","age":30,"city":"New York"}');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState('2');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, parseInt(indentSize));
      setOutput(formatted);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your input syntax",
        variant: "destructive",
      });
      setOutput("Error: Invalid JSON");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your input syntax",
        variant: "destructive",
      });
      setOutput("Error: Invalid JSON");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      toast({
        title: "JSON is valid",
        description: "Your JSON syntax is correct",
        variant: "default",
      });
      setOutput("JSON is valid ✓");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Invalid JSON",
        description: errorMessage,
        variant: "destructive",
      });
      setOutput(`Error: ${errorMessage}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={formatJson} variant="default">
          <FileJson className="mr-2 h-4 w-4" /> Format JSON
        </Button>
        <Button onClick={minifyJson} variant="outline">
          Minify JSON
        </Button>
        <Button onClick={validateJson} variant="outline">
          Validate JSON
        </Button>
        
        <div className="flex items-center space-x-2 ml-auto">
          <span className="text-sm">Indent:</span>
          <Select value={indentSize} onValueChange={setIndentSize}>
            <SelectTrigger className="w-16">
              <SelectValue placeholder="2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="8">8</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Input JSON:</label>
        <Textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="font-mono h-48"
        />
      </div>

      <div className="flex justify-center">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium">Output:</label>
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={!output}
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <Textarea 
          value={output} 
          readOnly 
          className="font-mono h-48 bg-muted/50"
        />
      </div>

      <div className="pt-4 border-t text-sm text-muted-foreground">
        <p>Tips:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Use Format to beautify JSON with proper indentation</li>
          <li>Use Minify to compress JSON by removing whitespace</li>
          <li>Use Validate to check if your JSON is correctly formatted</li>
        </ul>
      </div>
    </div>
  );
};

export default JsonFormatterTool;
