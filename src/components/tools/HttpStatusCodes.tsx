
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// HTTP status code data
const httpStatusCodes = [
  // 1xx Informational
  { code: 100, text: 'Continue', description: 'The server has received the request headers and the client should proceed to send the request body.' },
  { code: 101, text: 'Switching Protocols', description: 'The requester has asked the server to switch protocols and the server has agreed to do so.' },
  { code: 102, text: 'Processing', description: 'Server has received and is processing the request, but no response is available yet.' },
  { code: 103, text: 'Early Hints', description: 'Used to return some response headers before final HTTP message.' },
  
  // 2xx Success
  { code: 200, text: 'OK', description: 'Standard response for successful HTTP requests.' },
  { code: 201, text: 'Created', description: 'The request has been fulfilled, resulting in the creation of a new resource.' },
  { code: 202, text: 'Accepted', description: 'The request has been accepted for processing, but the processing has not been completed.' },
  { code: 203, text: 'Non-Authoritative Information', description: 'The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version of the origin\'s response.' },
  { code: 204, text: 'No Content', description: 'The server successfully processed the request, and is not returning any content.' },
  { code: 205, text: 'Reset Content', description: 'The server successfully processed the request, asks that the requester reset its document view, and is not returning any content.' },
  { code: 206, text: 'Partial Content', description: 'The server is delivering only part of the resource due to a range header sent by the client.' },
  { code: 207, text: 'Multi-Status', description: 'The message body that follows is an XML message and can contain a number of separate response codes.' },
  { code: 208, text: 'Already Reported', description: 'The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.' },
  { code: 226, text: 'IM Used', description: 'The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.' },
  
  // 3xx Redirection
  { code: 300, text: 'Multiple Choices', description: 'Indicates multiple options for the resource from which the client may choose.' },
  { code: 301, text: 'Moved Permanently', description: 'This and all future requests should be directed to the given URI.' },
  { code: 302, text: 'Found', description: 'Tells the client to look at (browse to) another URL.' },
  { code: 303, text: 'See Other', description: 'The response to the request can be found under another URI using the GET method.' },
  { code: 304, text: 'Not Modified', description: 'Indicates that the resource has not been modified since the version specified by the request headers.' },
  { code: 305, text: 'Use Proxy', description: 'The requested resource is available only through a proxy, the address for which is provided in the response.' },
  { code: 307, text: 'Temporary Redirect', description: 'In this case, the request should be repeated with another URI; however, future requests should still use the original URI.' },
  { code: 308, text: 'Permanent Redirect', description: 'This and all future requests should be directed to the given URI.' },
  
  // 4xx Client Error
  { code: 400, text: 'Bad Request', description: 'The server cannot or will not process the request due to an apparent client error.' },
  { code: 401, text: 'Unauthorized', description: 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.' },
  { code: 402, text: 'Payment Required', description: 'Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme.' },
  { code: 403, text: 'Forbidden', description: 'The request contained valid data and was understood by the server, but the server is refusing action.' },
  { code: 404, text: 'Not Found', description: 'The requested resource could not be found but may be available in the future.' },
  { code: 405, text: 'Method Not Allowed', description: 'A request method is not supported for the requested resource.' },
  { code: 406, text: 'Not Acceptable', description: 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.' },
  { code: 407, text: 'Proxy Authentication Required', description: 'The client must first authenticate itself with the proxy.' },
  { code: 408, text: 'Request Timeout', description: 'The server timed out waiting for the request.' },
  { code: 409, text: 'Conflict', description: 'Indicates that the request could not be processed because of conflict in the current state of the resource.' },
  { code: 410, text: 'Gone', description: 'Indicates that the resource requested is no longer available and will not be available again.' },
  { code: 411, text: 'Length Required', description: 'The request did not specify the length of its content, which is required by the requested resource.' },
  { code: 412, text: 'Precondition Failed', description: 'The server does not meet one of the preconditions that the requester put on the request.' },
  { code: 413, text: 'Payload Too Large', description: 'The request is larger than the server is willing or able to process.' },
  { code: 414, text: 'URI Too Long', description: 'The URI provided was too long for the server to process.' },
  { code: 415, text: 'Unsupported Media Type', description: 'The request entity has a media type which the server or resource does not support.' },
  { code: 416, text: 'Range Not Satisfiable', description: 'The client has asked for a portion of the file, but the server cannot supply that portion.' },
  { code: 417, text: 'Expectation Failed', description: 'The server cannot meet the requirements of the Expect request-header field.' },
  { code: 418, text: 'I\'m a teapot', description: 'This code was defined as one of the traditional IETF April Fools\' jokes. It is not expected to be implemented by actual HTTP servers.' },
  { code: 421, text: 'Misdirected Request', description: 'The request was directed at a server that is not able to produce a response.' },
  { code: 422, text: 'Unprocessable Entity', description: 'The request was well-formed but was unable to be followed due to semantic errors.' },
  { code: 423, text: 'Locked', description: 'The resource that is being accessed is locked.' },
  { code: 424, text: 'Failed Dependency', description: 'The request failed because it depended on another request and that request failed.' },
  { code: 425, text: 'Too Early', description: 'Indicates that the server is unwilling to risk processing a request that might be replayed.' },
  { code: 426, text: 'Upgrade Required', description: 'The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.' },
  { code: 428, text: 'Precondition Required', description: 'The origin server requires the request to be conditional.' },
  { code: 429, text: 'Too Many Requests', description: 'The user has sent too many requests in a given amount of time.' },
  { code: 431, text: 'Request Header Fields Too Large', description: 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.' },
  { code: 451, text: 'Unavailable For Legal Reasons', description: 'A server operator has received a legal demand to deny access to a resource or to a set of resources.' },
  
  // 5xx Server Error
  { code: 500, text: 'Internal Server Error', description: 'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.' },
  { code: 501, text: 'Not Implemented', description: 'The server either does not recognize the request method, or it lacks the ability to fulfil the request.' },
  { code: 502, text: 'Bad Gateway', description: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.' },
  { code: 503, text: 'Service Unavailable', description: 'The server cannot handle the request (because it is overloaded or down for maintenance).' },
  { code: 504, text: 'Gateway Timeout', description: 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.' },
  { code: 505, text: 'HTTP Version Not Supported', description: 'The server does not support the HTTP protocol version used in the request.' },
  { code: 506, text: 'Variant Also Negotiates', description: 'Transparent content negotiation for the request results in a circular reference.' },
  { code: 507, text: 'Insufficient Storage', description: 'The server is unable to store the representation needed to complete the request.' },
  { code: 508, text: 'Loop Detected', description: 'The server detected an infinite loop while processing the request.' },
  { code: 510, text: 'Not Extended', description: 'Further extensions to the request are required for the server to fulfill it.' },
  { code: 511, text: 'Network Authentication Required', description: 'The client needs to authenticate to gain network access.' },
];

const groupByRange = (codes: typeof httpStatusCodes) => {
  return codes.reduce((acc, code) => {
    const firstDigit = Math.floor(code.code / 100);
    if (!acc[firstDigit]) {
      acc[firstDigit] = [];
    }
    acc[firstDigit].push(code);
    return acc;
  }, {} as Record<number, typeof httpStatusCodes>);
};

const HttpStatusCodes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const groupedCodes = groupByRange(httpStatusCodes);
  
  const getStatusColor = (code: number) => {
    const firstDigit = Math.floor(code / 100);
    switch (firstDigit) {
      case 1: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 2: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 3: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 4: return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 5: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const filteredCodes = httpStatusCodes.filter(code => {
    const query = searchQuery.toLowerCase();
    return (
      code.code.toString().includes(query) ||
      code.text.toLowerCase().includes(query) ||
      code.description.toLowerCase().includes(query)
    );
  });
  
  const displayCodes = activeTab === 'all' ? filteredCodes : groupedCodes[parseInt(activeTab)]?.filter(code => {
    const query = searchQuery.toLowerCase();
    return (
      code.code.toString().includes(query) ||
      code.text.toLowerCase().includes(query) ||
      code.description.toLowerCase().includes(query)
    );
  }) || [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Input
          placeholder="Search by code, name, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="1">1xx</TabsTrigger>
            <TabsTrigger value="2">2xx</TabsTrigger>
            <TabsTrigger value="3">3xx</TabsTrigger>
            <TabsTrigger value="4">4xx</TabsTrigger>
            <TabsTrigger value="5">5xx</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 md:grid-cols-1">
              {displayCodes.length > 0 ? (
                displayCodes.map((status) => (
                  <StatusCodeItem key={status.code} status={status} colorClass={getStatusColor(status.code)} />
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">No status codes found matching your search.</p>
              )}
            </div>
          </TabsContent>

          {[1, 2, 3, 4, 5].map(digit => (
            <TabsContent key={digit} value={digit.toString()} className="mt-0">
              <div className="grid gap-4 md:grid-cols-1">
                {groupedCodes[digit]?.filter(status => {
                  const query = searchQuery.toLowerCase();
                  return (
                    status.code.toString().includes(query) ||
                    status.text.toLowerCase().includes(query) ||
                    status.description.toLowerCase().includes(query)
                  );
                }).map((status) => (
                  <StatusCodeItem key={status.code} status={status} colorClass={getStatusColor(status.code)} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="text-sm text-muted-foreground">
        <p className="font-medium mb-2">HTTP Status Code Categories:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><strong>1xx (Informational)</strong>: Request received, continuing process</li>
          <li><strong>2xx (Success)</strong>: The request was successfully received, understood, and accepted</li>
          <li><strong>3xx (Redirection)</strong>: Further action needs to be taken to complete the request</li>
          <li><strong>4xx (Client Error)</strong>: The request contains bad syntax or cannot be fulfilled</li>
          <li><strong>5xx (Server Error)</strong>: The server failed to fulfill a valid request</li>
        </ul>
      </div>
    </div>
  );
};

// Status code item component
const StatusCodeItem = ({ status, colorClass }: { 
  status: { code: number; text: string; description: string }; 
  colorClass: string;
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-3">
          <Badge className={`${colorClass} font-mono`}>{status.code}</Badge>
          {status.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{status.description}</p>
      </CardContent>
    </Card>
  );
};

export default HttpStatusCodes;
