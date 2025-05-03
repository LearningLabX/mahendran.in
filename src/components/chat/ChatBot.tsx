
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, X, Send, MessageSquare, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import { saveData, pushData } from '@/lib/realtimeDb';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Pre-defined responses for the chat bot
const botResponses = [
  {
    keywords: ['hello', 'hi', 'hey'],
    responses: [
      "Hey there! I'm Mahendran's AI assistant. How can I help with your mobile app development questions?",
      "Hello! Looking for help with Flutter, React Native, or other mobile dev topics?",
    ],
  },
  {
    keywords: ['flutter', 'dart'],
    responses: [
      "Flutter is a great choice! It uses Dart and offers true cross-platform development with a single codebase.",
      "For Flutter development, I'd recommend checking out Mahendran's Flutter tutorials in the blog section.",
      "Flutter's hot reload feature makes development much faster. Have you tried using it yet?",
    ],
  },
  {
    keywords: ['react', 'native', 'react native'],
    responses: [
      "React Native is excellent for leveraging JavaScript knowledge for mobile development.",
      "If you're familiar with React for web, React Native will feel quite natural with some platform-specific considerations.",
      "For React Native questions, check out the dedicated blog section with tutorials and best practices.",
    ],
  },
  {
    keywords: ['android', 'kotlin', 'java'],
    responses: [
      "Android development with Kotlin is highly recommended over Java these days.",
      "For native Android development, Mahendran has several tutorials focusing on performance optimization.",
      "Are you building a specific type of Android app? I might be able to point you to relevant resources.",
    ],
  },
  {
    keywords: ['ios', 'swift', 'objective'],
    responses: [
      "iOS development with Swift is quite rewarding. SwiftUI is revolutionizing how UIs are built.",
      "For iOS-specific questions, there are several tutorials in the blog section covering Swift and SwiftUI.",
      "Are you developing for a specific iOS version or considering compatibility across versions?",
    ],
  },
  {
    keywords: ['monetize', 'money', 'earn', 'revenue', 'adsense'],
    responses: [
      "App monetization is crucial! Consider a mix of ad revenue, in-app purchases, and freemium models.",
      "For mobile apps, subscription models tend to provide more stable revenue than one-time purchases.",
      "Check out the blog for specific articles on optimizing AdMob and other monetization strategies.",
    ],
  },
  {
    keywords: ['contact', 'hire', 'work', 'consulting'],
    responses: [
      "If you're looking to hire Mahendran for consulting or development work, head over to the Contact page.",
      "Mahendran offers consulting services for mobile app projects. You can reach out through the contact form.",
      "For professional inquiries, it's best to contact directly with project details through the contact page.",
    ],
  },
];

// Fallback responses when no keyword matches
const fallbackResponses = [
  "That's an interesting question! You might find some insights on that topic in the blog section.",
  "I don't have specific information on that, but Mahendran has written about similar topics in recent articles.",
  "Great question! For more detailed help, you might want to reach out through the contact form.",
  "I'm still learning! For more specific assistance, check out the related articles in the blog section.",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: "Hi there! I'm Mahendran's mobile dev assistant. Ask me about Flutter, React Native, app monetization, or anything mobile development related!",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check if any keywords match
    for (const item of botResponses) {
      if (item.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        const responseIndex = Math.floor(Math.random() * item.responses.length);
        return item.responses[responseIndex];
      }
    }
    
    // If no keywords match, use a fallback response
    const fallbackIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[fallbackIndex];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const timestamp = new Date();
    const messageId = Date.now().toString();
    
    // Add user message
    const newUserMessage = {
      id: messageId,
      text: inputValue,
      isBot: false,
      timestamp,
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Log user message to Firebase
    try {
      await pushData('chatLogs/messages', {
        messageId,
        text: inputValue,
        isUser: true,
        timestamp: timestamp.toISOString(),
        sessionId: getOrCreateSessionId()
      });
    } catch (error) {
      console.error('Error logging user message:', error);
    }
    
    // Track the user message event
    trackEvent('chat_message_sent', {
      message_length: inputValue.length,
      is_question: inputValue.includes('?'),
    });
    
    // Simulate bot typing - show typing indicator
    setIsTyping(true);
    
    // Generate bot response with a small randomized delay to feel more natural
    const typingDelay = 500 + Math.floor(Math.random() * 1000); // 0.5-1.5 seconds
    
    setTimeout(async () => {
      const botResponse = getBotResponse(inputValue);
      const botTimestamp = new Date();
      const botMessageId = (Date.now() + 1).toString();
      
      const newBotMessage = {
        id: botMessageId,
        text: botResponse,
        isBot: true,
        timestamp: botTimestamp,
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
      
      // Log bot response to Firebase
      try {
        await pushData('chatLogs/messages', {
          messageId: botMessageId,
          text: botResponse,
          isUser: false,
          timestamp: botTimestamp.toISOString(),
          userMessageId: messageId,
          sessionId: getOrCreateSessionId()
        });
        
        // Log complete conversation
        await pushData('chatLogs/conversations', {
          userMessage: inputValue,
          botResponse: botResponse,
          timestamp: botTimestamp.toISOString(),
          sessionId: getOrCreateSessionId()
        });
      } catch (error) {
        console.error('Error logging bot response:', error);
      }
      
      // Track bot response event
      trackEvent('chatbot_response', {
        user_message_length: inputValue.length,
        response_length: botResponse.length,
      });
    }, typingDelay);
  };

  // Generate or retrieve a session ID for this user
  const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('chat_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('chat_session_id', sessionId);
      
      // Log new session
      saveData(`chatLogs/sessions/${sessionId}`, {
        startTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        platform: navigator.platform
      });
    }
    return sessionId;
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    trackEvent('chat_toggle', { action: isOpen ? 'close' : 'open' });
    
    // Log chat open/close actions
    saveData('chatLogs/actions', {
      action: isOpen ? 'close' : 'open',
      timestamp: new Date().toISOString(),
      sessionId: getOrCreateSessionId()
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <Button 
        onClick={toggleChat}
        size="icon"
        className={`rounded-full h-14 w-14 shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[28rem] bg-background border rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            {/* Chat header */}
            <div className="p-3 border-b bg-primary text-primary-foreground flex items-center justify-between">
              <div className="flex items-center">
                <Bot size={20} className="mr-2" />
                <span className="font-medium">Tech Assistant</span>
              </div>
              <div className="flex items-center text-xs">
                <Clock size={14} className="mr-1" />
                <span>Real-time</span>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      message.isBot
                        ? 'bg-secondary text-secondary-foreground rounded-tl-none'
                        : 'bg-primary text-primary-foreground rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-lg rounded-tl-none px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <div className="p-3 border-t bg-muted/30 flex items-center gap-2">
              <Input
                placeholder="Ask anything about mobile development..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleInputKeyPress}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
