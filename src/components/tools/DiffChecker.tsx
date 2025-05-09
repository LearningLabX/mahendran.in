import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, ArrowRight, ArrowDown } from 'lucide-react';

const DiffChecker = () => {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diff, setDiff] = useState<React.ReactNode | null>(null);
  const [activeTab, setActiveTab] = useState('side-by-side');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const compareDiff = () => {
    if (!original || !modified) {
      toast({
        title: "Missing input",
        description: "Please provide both original and modified text",
        variant: "destructive",
      });
      return;
    }

    // Split text into lines
    const originalLines = original.split('\n');
    const modifiedLines = modified.split('\n');
    
    // Create a simple diff visualization
    const result = [];
    
    if (activeTab === 'side-by-side') {
      // Side by side comparison
      const maxLines = Math.max(originalLines.length, modifiedLines.length);
      
      for (let i = 0; i < maxLines; i++) {
        const origLine = originalLines[i] || '';
        const modLine = modifiedLines[i] || '';
        const isDifferent = origLine !== modLine;
        
        result.push(
          <div key={i} className="flex w-full">
            <div 
              className={`flex-1 p-1 ${isDifferent ? 'bg-red-100 dark:bg-red-900/20' : ''}`}
              style={{borderRight: '1px solid #ccc'}}
            >
              <pre className="whitespace-pre-wrap break-all">{origLine}</pre>
            </div>
            <div 
              className={`flex-1 p-1 ${isDifferent ? 'bg-green-100 dark:bg-green-900/20' : ''}`}
            >
              <pre className="whitespace-pre-wrap break-all">{modLine}</pre>
            </div>
          </div>
        );
      }
    } else {
      // Inline comparison
      let i = 0, j = 0;
      
      while (i < originalLines.length || j < modifiedLines.length) {
        const origLine = i < originalLines.length ? originalLines[i] : null;
        const modLine = j < modifiedLines.length ? modifiedLines[j] : null;
        
        if (origLine === modLine) {
          // Lines match, display as unchanged
          result.push(
            <div key={`same-${i}`} className="p-1">
              <pre className="whitespace-pre-wrap break-all">{origLine}</pre>
            </div>
          );
          i++;
          j++;
        } else if (origLine === null || (modLine !== null && origLine !== modLine)) {
          // Added line in modified text
          result.push(
            <div key={`add-${j}`} className="p-1 bg-green-100 dark:bg-green-900/20">
              <pre className="whitespace-pre-wrap break-all">+ {modLine}</pre>
            </div>
          );
          j++;
        } else {
          // Removed line from original text
          result.push(
            <div key={`del-${i}`} className="p-1 bg-red-100 dark:bg-red-900/20">
              <pre className="whitespace-pre-wrap break-all">- {origLine}</pre>
            </div>
          );
          i++;
        }
      }
    }
    
    setDiff(result);
  };

  const handleCopy = () => {
    let textToCopy = '';
    
    if (activeTab === 'side-by-side') {
      const originalLines = original.split('\n');
      const modifiedLines = modified.split('\n');
      const maxLines = Math.max(originalLines.length, modifiedLines.length);
      
      for (let i = 0; i < maxLines; i++) {
        const origLine = originalLines[i] || '';
        const modLine = modifiedLines[i] || '';
        const isDifferent = origLine !== modLine;
        
        textToCopy += `${isDifferent ? '- ' : '  '}${origLine}\n${isDifferent ? '+ ' : '  '}${modLine}\n\n`;
      }
    } else {
      const originalLines = original.split('\n');
      const modifiedLines = modified.split('\n');
      
      let i = 0, j = 0;
      
      while (i < originalLines.length || j < modifiedLines.length) {
        const origLine = i < originalLines.length ? originalLines[i] : null;
        const modLine = j < modifiedLines.length ? modifiedLines[j] : null;
        
        if (origLine === modLine) {
          textToCopy += `  ${origLine}\n`;
          i++;
          j++;
        } else if (origLine === null || (modLine !== null && origLine !== modLine)) {
          textToCopy += `+ ${modLine}\n`;
          j++;
        } else {
          textToCopy += `- ${origLine}\n`;
          i++;
        }
      }
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Diff result copied to clipboard",
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Original Text:</label>
          <Textarea 
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
            className="font-mono h-48"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Modified Text:</label>
          <Textarea 
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
            className="font-mono h-48"
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button onClick={compareDiff} className="mx-auto">
          <ArrowDown className="mr-2 h-4 w-4" />
          Compare Differences
        </Button>
      </div>

      {diff && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Tabs value={activeTab} onValueChange={(v) => {
              setActiveTab(v);
              // Re-run comparison when view changes
              if (diff) compareDiff();
            }}>
              <TabsList>
                <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
                <TabsTrigger value="inline">Inline</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className={`border rounded-md overflow-auto ${activeTab === 'side-by-side' ? 'diff-side-by-side' : 'diff-inline'}`} style={{maxHeight: '400px'}}>
            <div className={`font-mono text-sm ${activeTab === 'side-by-side' ? 'flex' : ''}`}>
              {activeTab === 'side-by-side' && (
                <>
                  <div className="flex-1 p-2 font-medium text-center border-b" style={{borderRight: '1px solid #ccc'}}>
                    Original
                  </div>
                  <div className="flex-1 p-2 font-medium text-center border-b">
                    Modified
                  </div>
                </>
              )}
            </div>
            <div className="font-mono text-sm">
              {diff}
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t text-sm text-muted-foreground">
        <p>Tips:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Red highlights show removed content</li>
          <li>Green highlights show added content</li>
          <li>Switch between side-by-side and inline views</li>
          <li>Use the copy button to share your diff results</li>
        </ul>
      </div>
    </div>
  );
};

export default DiffChecker;
