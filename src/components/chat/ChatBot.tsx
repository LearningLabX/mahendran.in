
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, X, Send, MessageSquare, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import { saveData, pushData, getData } from '@/lib/realtimeDb';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Enhanced responses with more specific information
const botResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'how are you', 'how r u'],
    responses: [
      "Hello! I'm doing well, thanks for asking. How can I help with your mobile app development questions today?",
      "Hey there! I'm here and ready to assist with any mobile development questions. What are you working on?",
      "Hi! I'm operational and ready to help. Do you have questions about Flutter, React Native, or another mobile framework?"
    ],
  },
  {
    keywords: ['flutter', 'dart'],
    responses: [
      "Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. Would you like some specific information about Flutter widgets, state management, or performance optimization?",
      "Flutter uses Dart language and offers hot reload for faster development cycles. Are you starting a new Flutter project or optimizing an existing one?",
      "For Flutter development, Mahendran's blog has detailed articles on state management patterns like Provider, Bloc, and Riverpod. Which approach are you considering for your project?"
    ],
  },
  {
    keywords: ['react', 'native', 'react native'],
    responses: [
      "React Native lets you build mobile apps using JavaScript and React. Are you looking for information about navigation, state management, or native modules integration?",
      "For React Native projects, I recommend checking Mahendran's tutorials about performance optimization and reducing bundle size. Would you like specific tips for your app?",
      "React Native works well with TypeScript for type safety. Have you considered integrating TypeScript into your React Native project? It can help catch errors early."
    ],
  },
  {
    keywords: ['android', 'kotlin', 'java'],
    responses: [
      "Android development has shifted primarily to Kotlin. Are you working on a specific Android component like Activities, Fragments, or Services?",
      "For native Android optimization, Mahendran's blog covers techniques like view recycling and background processing. What specific optimization are you targeting?",
      "Are you developing for a specific Android API level? Newer Android versions offer improved features while maintaining compatibility can be challenging with older devices."
    ],
  },
  {
    keywords: ['ios', 'swift', 'objective'],
    responses: [
      "iOS development with Swift offers great performance and a modern syntax. Are you working with UIKit or transitioning to SwiftUI?",
      "For iOS app architecture, Mahendran recommends MVVM or Clean Architecture patterns. Which architecture are you currently using?",
      "SwiftUI is transforming iOS development with its declarative approach. Have you started exploring SwiftUI for your projects yet?"
    ],
  },
  {
    keywords: ['monetize', 'money', 'earn', 'revenue', 'adsense'],
    responses: [
      "App monetization success depends on your audience and app category. Are you considering ads, in-app purchases, subscriptions, or a freemium model?",
      "For ad monetization, implementation quality matters as much as quantity. Mahendran's blog has case studies showing how strategic ad placement increased revenue by 40% without hurting user experience.",
      "Subscription models typically generate more stable revenue than one-time purchases. Would you like specific advice for implementing subscriptions in your mobile app?"
    ],
  },
  {
    keywords: ['contact', 'hire', 'work', 'consulting'],
    responses: [
      "Mahendran offers specialized consulting for mobile app projects. For a personalized response, please provide brief details about your project through the contact form.",
      "For professional collaboration, Mahendran has availability for projects starting next month. You can share your requirements through the contact page for a prompt response.",
      "If you'd like to discuss a potential project with Mahendran, the contact page has a form specifically for business inquiries that receives priority attention."
    ],
  },
  {
    keywords: ['performance', 'slow', 'optimization', 'fast'],
    responses: [
      "Mobile app performance optimization starts with identifying bottlenecks through profiling. Are you experiencing issues with startup time, rendering, or network operations?",
      "For React Native performance, Mahendran's recent article covers techniques that reduced frame drops by 60% in a production app. Would that be helpful for your project?",
      "Flutter's performance is generally excellent, but custom animations can cause jank. Are you implementing complex animations in your Flutter app?"
    ]
  },
  {
    keywords: ['database', 'storage', 'data', 'firebase', 'realm'],
    responses: [
      "For mobile databases, consider your offline requirements first. Firebase offers real-time syncing while SQLite provides full offline capability. What's your primary use case?",
      "Mahendran's blog compares Firebase, Realm, and SQLite performance in mobile apps under different conditions. The results might surprise you!",
      "When choosing a mobile database, consider not just features but also how it affects your app bundle size and startup time. What data complexity are you working with?"
    ]
  },
  {
    keywords: ['state', 'management', 'redux', 'bloc', 'provider'],
    responses: [
      "State management choice depends on app complexity. For small to medium apps, simpler solutions like Provider (Flutter) or Context API (React Native) often work well.",
      "Mahendran's comparative analysis of Redux, MobX, and Context API shows that Redux excels for complex apps while simpler solutions have less boilerplate for smaller projects.",
      "For Flutter state management, Mahendran recommends Riverpod for new projects as it offers better compile-time safety than Provider. Have you tried it yet?"
    ]
  }
];

// Improved fallback responses
const fallbackResponses = [
  "I don't have specific information about that yet. Can you provide more details about what you're looking for, especially related to mobile development?",
  "That's outside my current knowledge base. Could you rephrase your question focusing on mobile app development topics like Flutter, React Native, iOS, or Android?",
  "I'm not sure I understand your question. Could you elaborate more specifically on what you're trying to accomplish with your mobile application?",
  "I don't have enough context to answer that effectively. Would you mind sharing more details about your development environment or the specific problem you're facing?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recentInteractions, setRecentInteractions] = useState<{[key: string]: number}>({});
  
  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: "Hi there! I'm Mahendran's mobile dev assistant. I can help with Flutter, React Native, app monetization, or any mobile development questions. How can I assist you today?",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
    
    // Load recent conversation statistics
    const loadStats = async () => {
      try {
        const stats = await getData('chatLogs/statistics');
        if (stats) {
          setRecentInteractions(stats.recentTopics || {});
        }
      } catch (error) {
        console.error('Error loading chat statistics:', error);
      }
    };
    
    if (isOpen) {
      loadStats();
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getBotResponse = (userMessage: string) => {
    // Normalize user input
    const lowerCaseMessage = userMessage.toLowerCase().trim();
    
    if (lowerCaseMessage.length < 2) {
      return "Could you provide more details? I'm here to help with mobile development questions.";
    }
    
    // Track topic frequencies for analytics
    const updateTopicFrequency = (keyword: string) => {
      const currentDate = new Date().toISOString().split('T')[0];
      saveData(`chatLogs/statistics/recentTopics/${keyword}`, {
        count: (recentInteractions[keyword] || 0) + 1,
        lastUpdated: currentDate
      });
      
      setRecentInteractions(prev => ({
        ...prev,
        [keyword]: (prev[keyword] || 0) + 1
      }));
    };
    
    // Check if any keywords match
    for (const item of botResponses) {
      const matchedKeyword = item.keywords.find(keyword => lowerCaseMessage.includes(keyword));
      if (matchedKeyword) {
        // Track the matched topic
        updateTopicFrequency(matchedKeyword);
        
        // Select response based on message content - more specific matching
        const responseOptions = [...item.responses];
        
        // Pick response - prefer more contextual replies if possible
        let selectedResponse = responseOptions[Math.floor(Math.random() * responseOptions.length)];
        
        // Look for question patterns to provide more helpful responses
        if (lowerCaseMessage.includes('?') || 
            lowerCaseMessage.includes('how') || 
            lowerCaseMessage.includes('what') ||
            lowerCaseMessage.includes('why')) {
          // Prioritize responses that ask clarifying questions
          const questionResponses = responseOptions.filter(r => r.includes('?'));
          if (questionResponses.length > 0) {
            selectedResponse = questionResponses[Math.floor(Math.random() * questionResponses.length)];
          }
        }
        
        return selectedResponse;
      }
    }
    
    // If no keywords match, use a fallback response
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
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
    
    // Log user message to Firebase with enhanced metadata
    try {
      const sessionId = getOrCreateSessionId();
      const messageMetadata = {
        messageId,
        text: inputValue,
        isUser: true,
        timestamp: timestamp.toISOString(),
        sessionId,
        pageContext: window.location.pathname,
        messageLength: inputValue.length,
        hasQuestion: inputValue.includes('?'),
        clientTime: {
          hour: timestamp.getHours(),
          minute: timestamp.getMinutes(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      };
      
      await pushData('chatLogs/messages', messageMetadata);
      
      // Update user session with last activity
      await saveData(`chatLogs/sessions/${sessionId}/lastActivity`, {
        timestamp: timestamp.toISOString(),
        userMessage: inputValue
      });
    } catch (error) {
      console.error('Error logging user message:', error);
    }
    
    // Track the user message event with enhanced properties
    trackEvent('chat_message_sent', {
      message_length: inputValue.length,
      is_question: inputValue.includes('?'),
      current_page: window.location.pathname,
      time_of_day: new Date().getHours(),
      chat_session_length: messages.length
    });
    
    // Simulate bot typing - show typing indicator
    setIsTyping(true);
    
    // Generate bot response with a natural delay based on message complexity
    // Longer messages take more time to "think about"
    const baseDelay = 500;
    const charDelay = 20; // ms per character for realistic typing simulation
    const typingDelay = Math.min(
      2000, // Cap at 2 seconds maximum
      baseDelay + Math.floor(inputValue.length * charDelay)
    ); 
    
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
      
      // Log bot response to Firebase with enhanced analytics
      try {
        const sessionId = getOrCreateSessionId();
        await pushData('chatLogs/messages', {
          messageId: botMessageId,
          text: botResponse,
          isUser: false,
          timestamp: botTimestamp.toISOString(),
          userMessageId: messageId,
          sessionId,
          responseTime: botTimestamp.getTime() - timestamp.getTime(),
          responseLength: botResponse.length
        });
        
        // Log complete conversation with analytics context
        await pushData('chatLogs/conversations', {
          userMessage: inputValue,
          botResponse: botResponse,
          timestamp: botTimestamp.toISOString(),
          sessionId: getOrCreateSessionId(),
          conversationMetrics: {
            responseTimeMs: botTimestamp.getTime() - timestamp.getTime(),
            userMessageLength: inputValue.length,
            botResponseLength: botResponse.length,
            totalMessages: messages.length + 2, // Including current exchange
            page: window.location.pathname
          }
        });
      } catch (error) {
        console.error('Error logging bot response:', error);
      }
      
      // Track bot response event with detailed metrics
      trackEvent('chatbot_response', {
        user_message_length: inputValue.length,
        response_length: botResponse.length,
        response_time_ms: botTimestamp.getTime() - timestamp.getTime(),
        contained_question: botResponse.includes('?'),
        session_depth: messages.length
      });
    }, typingDelay);
  };

  // Generate or retrieve a session ID for this user with enhanced tracking
  const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('chat_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('chat_session_id', sessionId);
      
      // Log new session with enhanced metadata
      saveData(`chatLogs/sessions/${sessionId}`, {
        startTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        platform: navigator.platform,
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        language: navigator.language,
        entryPage: window.location.pathname,
        isReturningUser: !!localStorage.getItem('returning_visitor')
      });
      
      // Mark as returning visitor for future sessions
      localStorage.setItem('returning_visitor', 'true');
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
    
    // Enhanced analytics for chat open/close
    const action = isOpen ? 'close' : 'open';
    trackEvent('chat_toggle', { 
      action,
      time_on_page: Math.floor((Date.now() - performance.timing.navigationStart) / 1000),
      page: window.location.pathname,
      screen_size: `${window.innerWidth}x${window.innerHeight}`
    });
    
    // Log chat open/close actions with enhanced context
    saveData('chatLogs/actions', {
      action,
      timestamp: new Date().toISOString(),
      sessionId: getOrCreateSessionId(),
      pageContext: window.location.pathname,
      timeOnPage: Math.floor((Date.now() - performance.timing.navigationStart) / 1000),
      previousInteractions: messages.length
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
                <span className="font-medium">Mobile Dev Assistant</span>
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
