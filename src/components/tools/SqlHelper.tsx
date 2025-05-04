
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SqlHelper() {
  const [uuid, setUuid] = useState('550e8400-e29b-41d4-a716-446655440000');
  const [binary, setBinary] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [activeTab, setActiveTab] = useState('uuid-to-bin');
  const { toast } = useToast();

  // Generate a random UUID
  const generateRandomUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    setUuid(uuid);
  };

  // Convert UUID to Binary format for MySQL
  const convertUUIDtoBIN = (uuid: string) => {
    if (!uuid || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)) {
      return '';
    }

    // Remove hyphens
    return uuid.replace(/-/g, '');
  };

  // Convert Binary to UUID format
  const convertBINtoUUID = (bin: string) => {
    if (!bin || !/^[0-9a-f]{32}$/i.test(bin)) {
      return '';
    }

    // Add hyphens in UUID format
    return `${bin.substring(0, 8)}-${bin.substring(8, 12)}-${bin.substring(12, 16)}-${bin.substring(
      16,
      20
    )}-${bin.substring(20)}`;
  };

  // Generate SQL query for UUID to BIN conversion
  const generateUUIDtoBINQuery = (uuid: string) => {
    if (!uuid) return '';
    return `-- UUID to Binary conversion for MySQL
-- Original UUID: ${uuid}

-- Method 1: Using UNHEX(REPLACE())
INSERT INTO your_table (id, uuid_column) 
VALUES (1, UNHEX(REPLACE('${uuid}', '-', '')));

-- Method 2: Using UUID_TO_BIN() (MySQL 8.0+)
INSERT INTO your_table (id, uuid_column) 
VALUES (1, UUID_TO_BIN('${uuid}'));

-- Method 3: Using UUID_TO_BIN() with swap flag (MySQL 8.0+)
-- This stores in an optimized order for indexing
INSERT INTO your_table (id, uuid_column) 
VALUES (1, UUID_TO_BIN('${uuid}', 1));`;
  };

  // Generate SQL query for BIN to UUID conversion
  const generateBINtoUUIDQuery = (bin: string) => {
    if (!bin) return '';
    return `-- Binary to UUID conversion for MySQL
-- Original Binary (hex): ${bin}

-- Method 1: Using HEX() and INSERT()
SELECT 
  INSERT(
    INSERT(
      INSERT(
        INSERT(HEX(uuid_column), 9, 0, '-'),
        14, 0, '-'), 
      19, 0, '-'), 
    24, 0, '-')
AS formatted_uuid 
FROM your_table WHERE id = 1;

-- Method 2: Using BIN_TO_UUID() (MySQL 8.0+)
SELECT BIN_TO_UUID(uuid_column) 
FROM your_table WHERE id = 1;

-- Method 3: Using BIN_TO_UUID() with swap flag (MySQL 8.0+)
-- Use this if UUID was stored with swap flag = 1
SELECT BIN_TO_UUID(uuid_column, 1) 
FROM your_table WHERE id = 1;`;
  };

  // Update values when inputs change
  useEffect(() => {
    if (activeTab === 'uuid-to-bin') {
      setBinary(convertUUIDtoBIN(uuid));
      setSqlQuery(generateUUIDtoBINQuery(uuid));
    } else {
      setUuid(convertBINtoUUID(binary));
      setSqlQuery(generateBINtoUUIDQuery(binary));
    }
  }, [uuid, binary, activeTab]);

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied to clipboard`,
      description: "You can now paste it wherever you need.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="uuid-to-bin">UUID → Binary</TabsTrigger>
          <TabsTrigger value="bin-to-uuid">Binary → UUID</TabsTrigger>
        </TabsList>

        <TabsContent value="uuid-to-bin" className="space-y-4 mt-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="uuid-input">UUID</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={generateRandomUUID}
              >
                Generate Random UUID
              </Button>
            </div>
            <div className="flex gap-2">
              <Input 
                id="uuid-input"
                value={uuid} 
                onChange={(e) => setUuid(e.target.value)} 
                placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                className="font-mono"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => copyToClipboard(uuid, 'UUID')}
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="binary-output" className="mb-2 block">Binary Format (HEX)</Label>
            <div className="flex gap-2">
              <Input 
                id="binary-output"
                value={binary} 
                readOnly 
                className="font-mono bg-muted"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => copyToClipboard(binary, 'Binary format')}
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bin-to-uuid" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="binary-input" className="mb-2 block">Binary Format (HEX)</Label>
            <div className="flex gap-2">
              <Input 
                id="binary-input"
                value={binary} 
                onChange={(e) => setBinary(e.target.value)} 
                placeholder="e.g. 550e8400e29b41d4a716446655440000"
                className="font-mono"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => copyToClipboard(binary, 'Binary format')}
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="uuid-output" className="mb-2 block">UUID</Label>
            <div className="flex gap-2">
              <Input 
                id="uuid-output"
                value={uuid} 
                readOnly 
                className="font-mono bg-muted"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => copyToClipboard(uuid, 'UUID')}
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="sql-query">MySQL Query</Label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => copyToClipboard(sqlQuery, 'SQL query')}
          >
            Copy Query
          </Button>
        </div>
        <Textarea 
          id="sql-query"
          value={sqlQuery} 
          readOnly 
          className="min-h-[200px] font-mono bg-muted"
        />
      </div>
    </div>
  );
}
