import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import Layout from "@/components/Layout";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your health assistant. How can I help you today? You can ask me about symptoms, medications, or general health advice.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Predefined responses for demo
    if (message.includes("fever")) {
      return "For fever, I recommend:\n• Rest and stay hydrated\n• Take paracetamol if needed\n• Monitor your temperature\n• See a doctor if fever persists over 3 days or goes above 102°F";
    }
    
    if (message.includes("headache")) {
      return "For headaches, try:\n• Drink plenty of water\n• Rest in a quiet, dark room\n• Apply a cold or warm compress\n• Consider over-the-counter pain relievers\n• If severe or persistent, consult a doctor";
    }
    
    if (message.includes("cough")) {
      return "For cough relief:\n• Stay hydrated with warm liquids\n• Try honey and warm water\n• Use a humidifier\n• Avoid irritants like smoke\n• See a doctor if cough persists over 2 weeks";
    }
    
    if (message.includes("stomach") || message.includes("nausea")) {
      return "For stomach issues:\n• Eat bland foods (BRAT diet)\n• Stay hydrated with small sips\n• Avoid dairy and fatty foods\n• Try ginger tea\n• Rest and avoid solid foods initially";
    }
    
    if (message.includes("medicine") || message.includes("medication")) {
      return "Always consult with a healthcare professional before taking any medication. I can provide general information, but proper medical advice should come from qualified doctors or pharmacists.";
    }
    
    if (message.includes("emergency") || message.includes("urgent")) {
      return "⚠️ For medical emergencies, please call emergency services immediately (911 in the US). Don't rely on this chat for urgent medical situations.";
    }
    
    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! How are you feeling today? I'm here to help with general health questions and guidance.";
    }
    
    if (message.includes("thanks") || message.includes("thank you")) {
      return "You're welcome! Remember, this is general information only. For personalized medical advice, please consult with healthcare professionals. Stay healthy! 🌟";
    }

    // Default response
    return "I understand you're asking about health concerns. While I can provide general information, I recommend consulting with a healthcare professional for personalized advice. Is there a specific symptom you'd like to know more about?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const quickQuestions = [
    "What should I do for a fever?",
    "How to treat a headache?",
    "Natural remedies for cough",
    "When to see a doctor?",
  ];

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Chat Header */}
        <div className="p-4 border-b bg-gradient-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Health Assistant</h1>
              <p className="text-sm text-muted-foreground">Online • Always here to help</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isBot ? "" : "justify-end"}`}
            >
              {message.isBot && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <Card className={`max-w-[80%] ${
                message.isBot 
                  ? "bg-card shadow-card" 
                  : "bg-gradient-primary text-primary-foreground"
              }`}>
                <CardContent className="p-3">
                  <p className={`text-sm whitespace-pre-line ${
                    message.isBot ? "text-card-foreground" : "text-primary-foreground"
                  }`}>
                    {message.text}
                  </p>
                  <p className={`text-xs mt-2 ${
                    message.isBot ? "text-muted-foreground" : "text-primary-foreground/70"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </CardContent>
              </Card>

              {!message.isBot && (
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <Card className="bg-card shadow-card">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t bg-muted/30">
            <p className="text-sm font-medium mb-2 text-muted-foreground">Quick questions:</p>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2"
                  onClick={() => {
                    setInputValue(question);
                    handleSendMessage();
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              placeholder="Type your health question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-primary shadow-button"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;