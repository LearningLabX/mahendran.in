
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, Lightbulb, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const WidgetPlayground = () => {
  const [text, setText] = useState('Hello, Flutter!');
  const [fontSize, setFontSize] = useState(24);
  const [padding, setPadding] = useState(16);
  const [radius, setRadius] = useState(8);
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [alignment, setAlignment] = useState('center');
  const [widget, setWidget] = useState('text');
  const [buttonText, setButtonText] = useState('Click Me');
  const [containerWidth, setContainerWidth] = useState(300);
  const [containerHeight, setContainerHeight] = useState(200);
  const [showCode, setShowCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCode());
    // Would show a toast here
  };

  const generateRandomColors = () => {
    const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    setBgColor(randomColor());
    setTextColor(randomColor());
  };

  const generateCode = () => {
    if (widget === 'text') {
      return `
Text(
  '${text}',
  style: TextStyle(
    fontSize: ${fontSize}.0,
    color: Color(0x${textColor.replace('#', 'FF')}),
  ),
  textAlign: TextAlign.${alignment},
)`;
    } else if (widget === 'container') {
      return `
Container(
  width: ${containerWidth}.0,
  height: ${containerHeight}.0,
  padding: EdgeInsets.all(${padding}.0),
  decoration: BoxDecoration(
    color: Color(0x${bgColor.replace('#', 'FF')}),
    borderRadius: BorderRadius.circular(${radius}.0),
  ),
  child: Text(
    '${text}',
    style: TextStyle(
      fontSize: ${fontSize}.0,
      color: Color(0x${textColor.replace('#', 'FF')}),
    ),
    textAlign: TextAlign.${alignment},
  ),
)`;
    } else if (widget === 'button') {
      return `
ElevatedButton(
  onPressed: () {},
  style: ElevatedButton.styleFrom(
    backgroundColor: Color(0x${bgColor.replace('#', 'FF')}),
    padding: EdgeInsets.all(${padding}.0),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(${radius}.0),
    ),
  ),
  child: Text(
    '${buttonText}',
    style: TextStyle(
      fontSize: ${fontSize}.0,
      color: Color(0x${textColor.replace('#', 'FF')}),
    ),
  ),
)`;
    }
    return '';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Flutter Widget Playground</h3>
        <p className="text-muted-foreground">
          Experiment with Flutter widgets and generate code
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - Controls */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Widget Settings</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Widget Type Selector */}
              <div className="mb-6">
                <Label className="mb-2 block">Widget Type</Label>
                <RadioGroup
                  value={widget}
                  onValueChange={setWidget}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Text</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="container" id="container" />
                    <Label htmlFor="container">Container</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="button" id="button" />
                    <Label htmlFor="button">Button</Label>
                  </div>
                </RadioGroup>
              </div>

              <Tabs defaultValue="content" className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  {widget !== 'button' ? (
                    <div>
                      <Label htmlFor="text">Text Content</Label>
                      <Input
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="buttonText">Button Text</Label>
                      <Input
                        id="buttonText"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="style" className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <Label>Font Size: {fontSize}px</Label>
                    </div>
                    <Slider
                      value={[fontSize]}
                      min={10}
                      max={48}
                      step={1}
                      onValueChange={(value) => setFontSize(value[0])}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <Label>Border Radius: {radius}px</Label>
                    </div>
                    <Slider
                      value={[radius]}
                      min={0}
                      max={50}
                      step={1}
                      onValueChange={(value) => setRadius(value[0])}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <Label>Padding: {padding}px</Label>
                    </div>
                    <Slider
                      value={[padding]}
                      min={0}
                      max={50}
                      step={1}
                      onValueChange={(value) => setPadding(value[0])}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="textColor">Text Color</Label>
                      <div className="flex mt-1">
                        <div
                          className="w-10 h-10 rounded"
                          style={{ backgroundColor: textColor }}
                        ></div>
                        <Input
                          id="textColor"
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="flex-1 ml-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bgColor">Background Color</Label>
                      <div className="flex mt-1">
                        <div
                          className="w-10 h-10 rounded"
                          style={{ backgroundColor: bgColor }}
                        ></div>
                        <Input
                          id="bgColor"
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="flex-1 ml-2"
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={generateRandomColors} variant="outline" size="sm">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Random Colors
                  </Button>
                </TabsContent>

                <TabsContent value="layout" className="space-y-4">
                  <div>
                    <Label htmlFor="alignment">Text Alignment</Label>
                    <RadioGroup
                      value={alignment}
                      onValueChange={setAlignment}
                      className="flex gap-4 mt-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="left" />
                        <Label htmlFor="left">Left</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="center" id="center" />
                        <Label htmlFor="center">Center</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="right" />
                        <Label htmlFor="right">Right</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {widget === 'container' && (
                    <>
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label>Width: {containerWidth}px</Label>
                        </div>
                        <Slider
                          value={[containerWidth]}
                          min={50}
                          max={500}
                          step={10}
                          onValueChange={(value) => setContainerWidth(value[0])}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <Label>Height: {containerHeight}px</Label>
                        </div>
                        <Slider
                          value={[containerHeight]}
                          min={50}
                          max={500}
                          step={10}
                          onValueChange={(value) => setContainerHeight(value[0])}
                        />
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setShowCode(!showCode)}
              className="flex items-center"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showCode ? "Hide Code" : "View Code"}
            </Button>

            <Button onClick={handleCopyCode} className="flex items-center">
              <Copy className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
          </div>

          {showCode && (
            <Card>
              <CardContent className="pt-6">
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{generateCode()}</code>
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Side - Preview */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-md flex items-center justify-center overflow-hidden"
                style={{ 
                  minHeight: '300px', 
                  backgroundColor: widget === 'text' ? 'transparent' : bgColor 
                }}
              >
                {widget === 'text' && (
                  <div
                    style={{
                      fontSize: `${fontSize}px`,
                      color: textColor,
                      textAlign: alignment as 'left' | 'center' | 'right',
                      width: '100%',
                      padding: `${padding}px`,
                    }}
                  >
                    {text}
                  </div>
                )}

                {widget === 'container' && (
                  <div
                    style={{
                      width: `${containerWidth}px`,
                      height: `${containerHeight}px`,
                      backgroundColor: bgColor,
                      borderRadius: `${radius}px`,
                      padding: `${padding}px`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent:
                        alignment === 'center'
                          ? 'center'
                          : alignment === 'right'
                          ? 'flex-end'
                          : 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        fontSize: `${fontSize}px`,
                        color: textColor,
                        textAlign: alignment as 'left' | 'center' | 'right',
                        width: '100%',
                      }}
                    >
                      {text}
                    </span>
                  </div>
                )}

                {widget === 'button' && (
                  <button
                    className={cn(
                      "transition-all",
                      "hover:opacity-90 active:scale-95"
                    )}
                    style={{
                      backgroundColor: bgColor,
                      color: textColor,
                      padding: `${padding}px`,
                      borderRadius: `${radius}px`,
                      fontSize: `${fontSize}px`,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {buttonText}
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WidgetPlayground;
