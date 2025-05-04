
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface StatusCode {
  code: string;
  title: string;
  description: string;
  category: '1xx' | '2xx' | '3xx' | '4xx' | '5xx';
  example?: string;
}

const HTTP_STATUS_CODES: StatusCode[] = [
  // 1xx - Informational
  {
    code: '100',
    title: 'Continue',
    description: 'The server has received the request headers and the client should proceed to send the request body.',
    category: '1xx',
  },
  {
    code: '101',
    title: 'Switching Protocols',
    description: 'The requester has asked the server to switch protocols and the server has agreed to do so.',
    category: '1xx',
  },
  {
    code: '102',
    title: 'Processing',
    description: 'The server has received and is processing the request, but no response is available yet.',
    category: '1xx',
  },
  {
    code: '103',
    title: 'Early Hints',
    description: 'Used to return some response headers before final HTTP message.',
    category: '1xx',
  },

  // 2xx - Success
  {
    code: '200',
    title: 'OK',
    description: 'The request has succeeded. The information returned with the response depends on the method used in the request.',
    category: '2xx',
    example: '{"success": true, "data": {"id": 123, "name": "Example"}}'
  },
  {
    code: '201',
    title: 'Created',
    description: 'The request has been fulfilled and has resulted in one or more new resources being created.',
    category: '2xx',
    example: '{"id": 123, "created_at": "2023-04-23T18:25:43.511Z"}'
  },
  {
    code: '202',
    title: 'Accepted',
    description: 'The request has been accepted for processing, but the processing has not been completed.',
    category: '2xx',
  },
  {
    code: '204',
    title: 'No Content',
    description: 'The server successfully processed the request but is not returning any content.',
    category: '2xx',
  },
  {
    code: '206',
    title: 'Partial Content',
    description: 'The server is delivering only part of the resource due to a range header sent by the client.',
    category: '2xx',
  },

  // 3xx - Redirection
  {
    code: '300',
    title: 'Multiple Choices',
    description: 'The request has more than one possible response. The user-agent should choose one of them.',
    category: '3xx',
  },
  {
    code: '301',
    title: 'Moved Permanently',
    description: 'The URL of the requested resource has been changed permanently. The new URL is given in the response.',
    category: '3xx',
    example: 'Location: https://api.example.com/v2/users'
  },
  {
    code: '302',
    title: 'Found',
    description: 'The URL of the requested resource has been changed temporarily. The new URL is given in the response.',
    category: '3xx',
  },
  {
    code: '304',
    title: 'Not Modified',
    description: 'The client has performed a conditional GET request and access is allowed, but the document has not been modified.',
    category: '3xx',
  },
  {
    code: '307',
    title: 'Temporary Redirect',
    description: 'The server is sending this response to direct the client to get the requested resource at another URI with the same method that was used in the prior request.',
    category: '3xx',
  },
  {
    code: '308',
    title: 'Permanent Redirect',
    description: 'This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header.',
    category: '3xx',
  },

  // 4xx - Client Error
  {
    code: '400',
    title: 'Bad Request',
    description: 'The server could not understand the request due to invalid syntax.',
    category: '4xx',
    example: '{"error": "Invalid request parameters", "details": {"name": "Required field is missing"}}'
  },
  {
    code: '401',
    title: 'Unauthorized',
    description: 'The client must authenticate itself to get the requested response.',
    category: '4xx',
    example: '{"error": "Authentication required", "message": "Please provide a valid API token"}'
  },
  {
    code: '403',
    title: 'Forbidden',
    description: 'The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.',
    category: '4xx',
    example: '{"error": "Access denied", "message": "You do not have permission to access this resource"}'
  },
  {
    code: '404',
    title: 'Not Found',
    description: 'The server can not find the requested resource. In the browser, this means the URL is not recognized.',
    category: '4xx',
    example: '{"error": "Resource not found", "message": "The requested entity does not exist"}'
  },
  {
    code: '405',
    title: 'Method Not Allowed',
    description: 'The request method is known by the server but is not supported by the target resource.',
    category: '4xx',
  },
  {
    code: '409',
    title: 'Conflict',
    description: 'This response is sent when a request conflicts with the current state of the server.',
    category: '4xx',
    example: '{"error": "Conflict", "message": "A user with this email already exists"}'
  },
  {
    code: '418',
    title: "I'm a teapot",
    description: 'The server refuses to brew coffee because it is a teapot. This code is an April Fools joke from 1998.',
    category: '4xx',
  },
  {
    code: '429',
    title: 'Too Many Requests',
    description: 'The user has sent too many requests in a given amount of time (rate limiting).',
    category: '4xx',
    example: '{"error": "Rate limit exceeded", "retry_after": 60}'
  },

  // 5xx - Server Error
  {
    code: '500',
    title: 'Internal Server Error',
    description: 'The server has encountered a situation it doesn\'t know how to handle.',
    category: '5xx',
    example: '{"error": "Internal server error", "message": "Something went wrong"}'
  },
  {
    code: '501',
    title: 'Not Implemented',
    description: 'The request method is not supported by the server and cannot be handled.',
    category: '5xx',
  },
  {
    code: '502',
    title: 'Bad Gateway',
    description: 'The server, while working as a gateway to get a response needed to handle the request, got an invalid response.',
    category: '5xx',
  },
  {
    code: '503',
    title: 'Service Unavailable',
    description: 'The server is not ready to handle the request. Common causes are a server that is down for maintenance or is overloaded.',
    category: '5xx',
    example: '{"error": "Service unavailable", "retry_after": 120}'
  },
  {
    code: '504',
    title: 'Gateway Timeout',
    description: 'The server is acting as a gateway and cannot get a response in time.',
    category: '5xx',
  },
];

const HttpStatusCodes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedCodes, setExpandedCodes] = useState<string[]>([]);
  const { toast } = useToast();
  
  const toggleExpand = (code: string) => {
    setExpandedCodes(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code) 
        : [...prev, code]
    );
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code snippet has been copied",
    });
  };
  
  const filteredCodes = HTTP_STATUS_CODES.filter(status => {
    const matchesSearch = 
      status.code.includes(searchTerm) || 
      status.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = activeTab === 'all' || status.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });
  
  const getCategoryName = (category: string) => {
    switch(category) {
      case '1xx': return 'Informational';
      case '2xx': return 'Success';
      case '3xx': return 'Redirection';
      case '4xx': return 'Client Error';
      case '5xx': return 'Server Error';
      default: return 'All Status Codes';
    }
  };
  
  const getBadgeColor = (category: string) => {
    switch(category) {
      case '1xx': return 'bg-blue-500';
      case '2xx': return 'bg-green-500';
      case '3xx': return 'bg-yellow-500';
      case '4xx': return 'bg-red-500';
      case '5xx': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Input 
          placeholder="Search HTTP status codes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <p className="text-sm text-muted-foreground">
          Search by code, title, or description
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="1xx">1xx - Informational</TabsTrigger>
          <TabsTrigger value="2xx">2xx - Success</TabsTrigger>
          <TabsTrigger value="3xx">3xx - Redirection</TabsTrigger>
          <TabsTrigger value="4xx">4xx - Client Error</TabsTrigger>
          <TabsTrigger value="5xx">5xx - Server Error</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {getCategoryName(activeTab)} 
              <Badge variant="outline" className="ml-2">
                {filteredCodes.length} codes
              </Badge>
            </h2>
            
            {filteredCodes.map((status) => (
              <Card key={status.code} className="overflow-hidden">
                <CardHeader className="pb-2 cursor-pointer hover:bg-muted/50" onClick={() => toggleExpand(status.code)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getBadgeColor(status.category)} text-white`}>
                        {status.code}
                      </Badge>
                      <CardTitle className="text-lg">{status.title}</CardTitle>
                    </div>
                    {expandedCodes.includes(status.code) ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </div>
                  <CardDescription className="line-clamp-1">
                    {status.description}
                  </CardDescription>
                </CardHeader>
                
                {expandedCodes.includes(status.code) && (
                  <CardContent className="pt-4">
                    <p className="mb-4">{status.description}</p>
                    
                    {status.example && (
                      <div className="bg-muted text-muted-foreground rounded-md p-3 mt-2 relative">
                        <div className="absolute right-2 top-2">
                          <button 
                            onClick={() => copyToClipboard(status.example || '')}
                            className="p-1 rounded-sm hover:bg-background"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <h4 className="text-sm font-medium mb-2">Example response:</h4>
                        <pre className="text-xs overflow-auto">{status.example}</pre>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-2 border-t text-xs text-muted-foreground">
                      <span className="font-semibold">Category:</span> {status.category} - {getCategoryName(status.category)}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
            
            {filteredCodes.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                <h3 className="text-lg font-medium">No matching status codes found</h3>
                <p className="mt-2">Try adjusting your search term</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HttpStatusCodes;
