
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, Check, Binary } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

type ConversionType = 'uuid-to-bin' | 'bin-to-uuid' | 'sql-formatter';

const SqlHelper = () => {
  const [activeTab, setActiveTab] = useState<ConversionType>('uuid-to-bin');
  const [uuidInput, setUuidInput] = useState('123e4567-e89b-12d3-a456-426614174000');
  const [binInput, setBinInput] = useState('0x123e4567e89b12d3a456426614174000');
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
      const uuidWithoutDash = uuidInput.replace(/-/g, '');
      const tableName = "my_table";
      const columnName = "uuid_column";
      
      const insertSql = `-- Insert with UUID_TO_BIN()
INSERT INTO ${tableName} (${columnName}) 
VALUES (UUID_TO_BIN('${uuidInput}', 1));`;
      
      const selectSql = `-- Select with BIN_TO_UUID()
SELECT BIN_TO_UUID(${columnName}, 1) as uuid_text 
FROM ${tableName};`;
      
      const hexFormatted = `-- Hex representation for UUID
0x${uuidWithoutDash}`;
      
      const explanation = `-- Explanation:
-- UUID_TO_BIN(uuid, swap_flag) converts a UUID to binary
-- The second parameter (1) swaps time-low and time-high parts for better indexing
-- This makes the binary UUID more efficient for indexing time-based UUIDs`;

      setOutput(`${insertSql}\n\n${selectSql}\n\n${hexFormatted}\n\n${explanation}\n\n-- Direct MySQL functions
SELECT UUID_TO_BIN('${uuidInput}', 1); -- Converts to binary
SELECT HEX(UUID_TO_BIN('${uuidInput}', 1)); -- Shows hex value of binary`);
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
      let binValue = binInput.trim();
      
      // Handle different formats
      if (binValue.startsWith('0x')) {
        binValue = binValue.substring(2); // Remove 0x prefix if present
      }
      
      // Make sure it's a valid hex string
      if (!/^[0-9a-f]+$/i.test(binValue)) {
        toast({
          title: "Invalid hex format",
          description: "Please enter a valid hexadecimal value",
          variant: "destructive",
        });
        return;
      }
      
      const tableName = "my_table";
      const columnName = "binary_uuid";
      
      const sqlStatement = `-- Convert binary to UUID using BIN_TO_UUID
SELECT BIN_TO_UUID(${columnName}, 1) as uuid
FROM ${tableName}
WHERE id = 1;`;
      
      const hexFormat = `-- Or using direct hex input
SELECT BIN_TO_UUID(UNHEX('${binValue}'), 1) AS uuid;`;
      
      const selectWithJoin = `-- Example in JOIN query
SELECT 
  u.name, 
  BIN_TO_UUID(u.id, 1) as user_uuid
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';`;
      
      setOutput(`${sqlStatement}\n\n${hexFormat}\n\n${selectWithJoin}\n\n-- Full UUID value if conversion worked:
-- xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`);
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
        <CardTitle className="flex items-center gap-2">
          <Binary className="h-5 w-5" />
          <span>UUID/Binary Converter for MySQL</span>
        </CardTitle>
        <CardDescription>
          Convert between UUID and binary formats for efficient MySQL storage, format SQL queries
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
              <p className="text-xs text-muted-foreground mt-1">
                Enter a UUID in the standard format with dashes
              </p>
            </div>
          </TabsContent>

          <TabsContent value="bin-to-uuid" className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Binary UUID (hex format)</label>
              <Input 
                value={binInput}
                onChange={(e) => setBinInput(e.target.value)}
                placeholder="0x123e4567e89b12d3a456426614174000"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter a hex value with or without 0x prefix, or a MySQL column name
              </p>
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
