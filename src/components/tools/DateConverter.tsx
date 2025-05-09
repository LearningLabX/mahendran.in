
import { useState, useEffect } from 'react';
import { format, parse, fromUnixTime } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DateConverter = () => {
  const [dateInput, setDateInput] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [unixTimestamp, setUnixTimestamp] = useState('');
  const [isoDate, setIsoDate] = useState('');
  const [readableDate, setReadableDate] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  // Update once every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update formats when current date changes
  useEffect(() => {
    setUnixTimestamp(Math.floor(currentDate.getTime() / 1000).toString());
    setIsoDate(currentDate.toISOString());
    setReadableDate(format(currentDate, 'PPpp'));
  }, [currentDate]);

  const handleDateConvert = () => {
    try {
      let dateObj: Date | null = null;

      // Try to determine the input format and parse it
      if (/^\d{10,13}$/.test(dateInput)) {
        // Unix timestamp (seconds or milliseconds)
        const timestamp = parseInt(dateInput);
        dateObj = timestamp > 9999999999 
          ? new Date(timestamp) // milliseconds
          : fromUnixTime(timestamp); // seconds
      } else if (dateInput.includes('T') && dateInput.includes('Z')) {
        // ISO format
        dateObj = new Date(dateInput);
      } else {
        // Try to parse as a readable date
        dateObj = parse(dateInput, 'PPpp', new Date());
        if (isNaN(dateObj.getTime())) {
          dateObj = new Date(dateInput);
        }
      }

      if (dateObj && !isNaN(dateObj.getTime())) {
        setCurrentDate(dateObj);
      } else {
        throw new Error('Invalid date format');
      }
    } catch (error) {
      console.error('Error parsing date:', error);
      alert('Could not parse the date. Please use a valid format.');
    }
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow">
            <Label htmlFor="date-input" className="mb-1 block">Enter Date</Label>
            <Input
              id="date-input"
              placeholder="Enter a date, timestamp, or ISO string"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleDateConvert}>Convert</Button>
          </div>
        </div>

        <div className="pt-2 text-sm text-muted-foreground">
          <p>Accepts: Unix timestamp (seconds/milliseconds), ISO string, or human-readable date</p>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Format</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="w-16">Copy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Unix Timestamp</TableCell>
              <TableCell className="font-mono">{unixTimestamp}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(unixTimestamp, 'unix')}
                >
                  {copied === 'unix' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ISO 8601</TableCell>
              <TableCell className="font-mono">{isoDate}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(isoDate, 'iso')}
                >
                  {copied === 'iso' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Human Readable</TableCell>
              <TableCell className="font-mono">{readableDate}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(readableDate, 'readable')}
                >
                  {copied === 'readable' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium">Common Date Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-secondary/20 rounded">
            <span className="font-medium">Year-Month-Day:</span> {format(currentDate, 'yyyy-MM-dd')}
          </div>
          <div className="p-2 bg-secondary/20 rounded">
            <span className="font-medium">Month/Day/Year:</span> {format(currentDate, 'MM/dd/yyyy')}
          </div>
          <div className="p-2 bg-secondary/20 rounded">
            <span className="font-medium">Relative:</span> {format(currentDate, "PPP")}
          </div>
          <div className="p-2 bg-secondary/20 rounded">
            <span className="font-medium">Time (24h):</span> {format(currentDate, 'HH:mm:ss')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateConverter;
