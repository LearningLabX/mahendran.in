
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ColorConverter = () => {
  const [hexColor, setHexColor] = useState('#3B82F6');
  const [rgbColor, setRgbColor] = useState({ r: 59, g: 130, b: 246 });
  const [flutterColor, setFlutterColor] = useState('Color(0xFF3B82F6)');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  
  useEffect(() => {
    // Convert hex to RGB
    if (hexColor.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      let hex = hexColor.replace('#', '');
      
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      setRgbColor({ r, g, b });
      setFlutterColor(`Color(0xFF${hex.toUpperCase()})`);
    }
  }, [hexColor]);
  
  const handleRgbChange = (component: 'r' | 'g' | 'b', value: string) => {
    const numberValue = Math.min(255, Math.max(0, Number(value) || 0));
    const newRgb = { ...rgbColor, [component]: numberValue };
    setRgbColor(newRgb);
    
    const hexValue = `#${newRgb.r.toString(16).padStart(2, '0')}${
      newRgb.g.toString(16).padStart(2, '0')}${
      newRgb.b.toString(16).padStart(2, '0')}`.toUpperCase();
    
    setHexColor(hexValue);
    setFlutterColor(`Color(0xFF${hexValue.replace('#', '').toUpperCase()})`);
  };
  
  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow space-y-2">
          <div className="space-y-1.5">
            <Label htmlFor="hex-color">HEX Color</Label>
            <div className="flex gap-2">
              <Input
                id="hex-color"
                type="text"
                value={hexColor}
                onChange={(e) => setHexColor(e.target.value)}
                className="font-mono"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => copyToClipboard(hexColor, 'hex')}
              >
                {copiedFormat === 'hex' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="rgb-color">RGB Color</Label>
            <div className="flex gap-2">
              <div className="grid grid-cols-3 gap-2 flex-1">
                <Input
                  placeholder="R"
                  type="number"
                  min="0"
                  max="255"
                  value={rgbColor.r}
                  onChange={(e) => handleRgbChange('r', e.target.value)}
                  className="font-mono"
                />
                <Input
                  placeholder="G"
                  type="number"
                  min="0"
                  max="255" 
                  value={rgbColor.g}
                  onChange={(e) => handleRgbChange('g', e.target.value)}
                  className="font-mono"
                />
                <Input
                  placeholder="B"
                  type="number"
                  min="0"
                  max="255"
                  value={rgbColor.b}
                  onChange={(e) => handleRgbChange('b', e.target.value)}
                  className="font-mono"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`, 'rgb')}
              >
                {copiedFormat === 'rgb' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="flutter-color">Flutter Color</Label>
            <div className="flex gap-2">
              <Input
                id="flutter-color"
                type="text"
                value={flutterColor}
                readOnly
                className="font-mono"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => copyToClipboard(flutterColor, 'flutter')}
              >
                {copiedFormat === 'flutter' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-48 h-48 rounded-md border overflow-hidden">
          <div 
            className="w-full h-full" 
            style={{ backgroundColor: hexColor }}
          ></div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <h3 className="text-lg font-medium mb-3">Color Preview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-12 rounded-md" style={{ backgroundColor: hexColor }}></div>
            <p className="text-xs text-center">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="h-12 rounded-md" style={{ backgroundColor: hexColor, opacity: 0.8 }}></div>
            <p className="text-xs text-center">80% Opacity</p>
          </div>
          <div className="space-y-2">
            <div className="h-12 rounded-md" style={{ backgroundColor: hexColor, opacity: 0.5 }}></div>
            <p className="text-xs text-center">50% Opacity</p>
          </div>
          <div className="space-y-2">
            <div className="h-12 rounded-md" style={{ backgroundColor: hexColor, opacity: 0.2 }}></div>
            <p className="text-xs text-center">20% Opacity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
