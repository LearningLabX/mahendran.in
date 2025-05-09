
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ApiTester = () => {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [headers, setHeaders] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  
  const sendRequest = async () => {
    setLoading(true);
    setResponse('');
    setStatus('');
    
    try {
      const requestOptions: RequestInit = {
        method,
        headers: headers ? JSON.parse(headers) : {},
        body: ['POST', 'PUT', 'PATCH'].includes(method) ? requestBody : undefined
      };
      
      const res = await fetch(url, requestOptions);
      const contentType = res.headers.get('content-type');
      
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
        data = JSON.stringify(data, null, 2);
      } else {
        data = await res.text();
      }
      
      setResponse(data);
      setStatus(`Status: ${res.status} ${res.statusText}`);
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('Error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            value={method}
            onValueChange={setMethod}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            className="flex-grow"
          />
          
          <Button onClick={sendRequest} disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </div>
        
        <Tabs defaultValue="body">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
          </TabsList>
          <TabsContent value="body" className="space-y-2">
            <Label>Request Body (JSON)</Label>
            <Textarea
              placeholder="{ }"
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              rows={5}
              className="font-mono text-sm"
              disabled={!['POST', 'PUT', 'PATCH'].includes(method)}
            />
          </TabsContent>
          <TabsContent value="headers" className="space-y-2">
            <Label>Request Headers (JSON)</Label>
            <Textarea
              placeholder="{ &#34;Content-Type&#34;: &#34;application/json&#34; }"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              rows={5}
              className="font-mono text-sm"
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {status && (
        <div className={`p-2 text-sm font-medium rounded ${
          status.includes('200') || status.includes('201') ? 
            'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 
            'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'
        }`}>
          {status}
        </div>
      )}
      
      {response && (
        <div className="space-y-2">
          <Label>Response</Label>
          <div className="border rounded-md p-4 bg-secondary/10 overflow-auto max-h-96">
            <pre className="font-mono text-sm whitespace-pre-wrap">{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTester;
