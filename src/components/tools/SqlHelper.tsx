
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

type ConversionType = 'uuid-to-bin' | 'bin-to-uuid' | 'sql-formatter';

const SqlHelper = () => {
  const [activeTab, setActiveTab] = useState<ConversionType>('uuid-to-bin');
  const [uuidInput, setUuidInput] = useState('123e4567-e89b-12d3-a456-426614174000');
  const [binInput, setBinInput] = useState('');
  const [sqlInput, setSqlInput] = useState('SELECT id, name, email FROM users WHERE status = "active" AND created_at > "2023-01-01"');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied to clipboard",
      description: "The output has been copied to your clipboard.",
      duration: 3000,
    });
  };

  const convertUuidToBin = () => {
    try {
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(uuidInput)) {
        toast({
          title: "Invalid UUID format",
          description: "Please enter a valid UUID in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          variant: "destructive",
        });
        return;
      }

      // MySQL UUID_TO_BIN function equivalent in SQL syntax
      const sqlStatement = `SELECT UUID_TO_BIN('${uuidInput}', 1) as binary_uuid;`;
      const hexRepresentation = uuidInput.replace(/-/g, '');
      
      setOutput(`-- SQL Function\n${sqlStatement}\n\n-- Hex representation\n0x${hexRepresentation}\n\n-- Usage in queries\nINSERT INTO users (id, name) VALUES (UUID_TO_BIN('${uuidInput}', 1), 'John Doe');`);
    } catch (error) {
      toast({
        title: "Conversion error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const convertBinToUuid = () => {
    try {
      const sqlStatement = `SELECT BIN_TO_UUID(${binInput}, 1) as uuid;`;
      setOutput(`-- SQL Function\n${sqlStatement}\n\n-- Usage example\nSELECT BIN_TO_UUID(id, 1) as uuid, name FROM users;`);
    } catch (error) {
      toast({
        title: "Conversion error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const formatSql = () => {
    try {
      // Basic SQL formatting logic
      let formatted = sqlInput
        .replace(/\s+/g, ' ')                     // Replace multiple spaces with single space
        .replace(/\s*,\s*/g, ', ')                // Format commas
        .replace(/\s*=\s*/g, ' = ')               // Format equals
        .replace(/\s*>\s*/g, ' > ')               // Format greater than
        .replace(/\s*<\s*/g, ' < ')               // Format less than
        .replace(/\s*SELECT\s/gi, 'SELECT\n  ')   // Format SELECT
        .replace(/\s*FROM\s/gi, '\nFROM\n  ')     // Format FROM
        .replace(/\s*WHERE\s/gi, '\nWHERE\n  ')   // Format WHERE
        .replace(/\s*AND\s/gi, '\n  AND ')        // Format AND
        .replace(/\s*OR\s/gi, '\n  OR ')          // Format OR
        .replace(/\s*ORDER BY\s/gi, '\nORDER BY\n  '); // Format ORDER BY

      setOutput(formatted);
    } catch (error) {
      toast({
        title: "Formatting error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleConvert = () => {
    switch (activeTab) {
      case 'uuid-to-bin':
        convertUuidToBin();
        break;
      case 'bin-to-uuid':
        convertBinToUuid();
        break;
      case 'sql-formatter':
        formatSql();
        break;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SQL Helper</CardTitle>
        <CardDescription>
          Convert between UUID and binary formats, format SQL queries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ConversionType)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="uuid-to-bin">UUID to Binary</TabsTrigger>
            <TabsTrigger value="bin-to-uuid">Binary to UUID</TabsTrigger>
            <TabsTrigger value="sql-formatter">SQL Formatter</TabsTrigger>
          </TabsList>

          <TabsContent value="uuid-to-bin" className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">UUID</label>
              <Input 
                value={uuidInput}
                onChange={(e) => setUuidInput(e.target.value)}
                placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
                className="font-mono text-sm"
              />
            </div>
          </TabsContent>

          <TabsContent value="bin-to-uuid" className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Binary UUID (hex format)</label>
              <Input 
                value={binInput}
                onChange={(e) => setBinInput(e.target.value)}
                placeholder="0x or column name"
                className="font-mono text-sm"
              />
            </div>
          </TabsContent>

          <TabsContent value="sql-formatter" className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">SQL Query</label>
              <Textarea 
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                rows={5}
                className="font-mono text-sm"
                placeholder="Enter SQL query to format"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4">
          <Button onClick={handleConvert} className="w-full">Convert</Button>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium">Output</label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>
          <Textarea 
            value={output}
            readOnly
            rows={8}
            className="font-mono text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SqlHelper;
