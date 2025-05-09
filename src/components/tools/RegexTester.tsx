
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const RegexTester = () => {
  const [regexInput, setRegexInput] = useState('');
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('g');
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    setError('');
    setResults([]);
    
    if (!regexPattern) {
      setError('Please enter a regex pattern');
      return;
    }
    
    try {
      const regex = new RegExp(regexPattern, regexFlags);
      const matches = regexInput.match(regex);
      
      if (matches && matches.length > 0) {
        setResults(matches);
      } else {
        setResults(['No matches found']);
      }
    } catch (err) {
      setError(`Invalid regex: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="regex-pattern">Regular Expression Pattern</Label>
          <Input
            id="regex-pattern"
            placeholder="Enter regex pattern (e.g., \d+)"
            value={regexPattern}
            onChange={(e) => setRegexPattern(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="regex-flags">Flags</Label>
          <Input
            id="regex-flags"
            placeholder="g, i, m, etc."
            value={regexFlags}
            onChange={(e) => setRegexFlags(e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="test-input">Test Input</Label>
        <Textarea
          id="test-input"
          placeholder="Enter text to test against the regex"
          value={regexInput}
          onChange={(e) => setRegexInput(e.target.value)}
          rows={5}
          className="font-mono text-sm"
        />
      </div>
      
      <Button onClick={testRegex}>Test Regex</Button>
      
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-md text-red-800 dark:text-red-300">
          {error}
        </div>
      )}
      
      {results.length > 0 && !error && (
        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium mb-2">Matches ({results.length}):</h3>
          <div className="bg-secondary/20 p-3 rounded-md overflow-auto max-h-40">
            {results.map((match, index) => (
              <div key={index} className="font-mono text-sm">
                {index + 1}. <span className="text-primary">{match}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegexTester;
