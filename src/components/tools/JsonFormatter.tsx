
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';

const JsonFormatter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    setError('');
    setFormattedJson('');
    
    if (!jsonInput.trim()) {
      setError('Please enter JSON to format');
      return;
    }
    
    try {
      const parsedJson = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsedJson, null, 2));
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="json-input">JSON Input</Label>
        <Textarea
          id="json-input"
          placeholder='Enter JSON (e.g., {"name": "John", "age": 30})'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={6}
          className="font-mono text-sm"
        />
      </div>
      
      <div className="flex space-x-2">
        <Button onClick={formatJson}>Format JSON</Button>
        <Button variant="outline" onClick={() => setJsonInput('')}>Clear</Button>
      </div>
      
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-md text-red-800 dark:text-red-300">
          {error}
        </div>
      )}
      
      {formattedJson && !error && (
        <div className="border rounded-md">
          <div className="flex items-center justify-between p-2 bg-muted/50 border-b">
            <Label className="text-sm">Formatted JSON</Label>
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
          <div className="p-4 bg-secondary/10 overflow-auto max-h-80">
            <pre className="font-mono text-sm whitespace-pre-wrap">{formattedJson}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonFormatter;
