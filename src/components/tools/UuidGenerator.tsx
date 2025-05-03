
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Helper function to generate UUIDs
const generateUuid = (version = 4) => {
  if (version === 4) {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  } else {
    // Simple UUID v1-like (time-based with random node)
    const now = new Date();
    const timeMs = now.getTime();
    const perfTime = window.performance && window.performance.now ? window.performance.now() : 0;
    const random = Math.random().toString(36).substring(2, 15);
    const uuid = `${timeMs}-${perfTime}-${random}`;
    return 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, i) => {
      const r = (timeMs + i) % 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
};

const UuidGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [uuidVersion, setUuidVersion] = useState<number>(4);
  const [count, setCount] = useState<number>(5);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  useEffect(() => {
    generateUuids();
  }, []);
  
  const generateUuids = () => {
    const newUuids = Array.from({ length: count }, () => generateUuid(uuidVersion));
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllToClipboard = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedIndex(-1); // -1 represents "all"
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="space-y-2 flex-grow">
          <Label>UUID Version</Label>
          <RadioGroup 
            value={uuidVersion.toString()} 
            onValueChange={(value) => setUuidVersion(parseInt(value))}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="uuid-v4" />
              <Label htmlFor="uuid-v4">v4 (Random)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="uuid-v1" />
              <Label htmlFor="uuid-v1">v1 (Timestamp)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="w-24">
          <Label htmlFor="uuid-count">Count</Label>
          <Input
            id="uuid-count"
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
          />
        </div>
        
        <Button onClick={generateUuids}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Generated UUIDs</Label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyAllToClipboard}
            disabled={uuids.length === 0}
          >
            {copiedIndex === -1 ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
            {copiedIndex === -1 ? 'Copied All' : 'Copy All'}
          </Button>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          {uuids.length > 0 ? (
            <div className="divide-y">
              {uuids.map((uuid, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-3 hover:bg-secondary/10"
                >
                  <span className="font-mono text-sm select-all">{uuid}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(uuid, index)}
                  >
                    {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No UUIDs generated. Click Generate to create some UUIDs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UuidGenerator;
