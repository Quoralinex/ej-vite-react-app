import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [assistantType, setAssistantType] = useState('career');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputValue.trim() };
    const updatedHistory = [...messages, userMessage];
    
    setMessages(updatedHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('Sending chat request:', { assistantType, messageCount: updatedHistory.length });
      
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: updatedHistory,
          assistantType
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to get response');
      }

      if (!data?.success) {
        console.error('Chat function returned error:', data);
        throw new Error(data?.error || 'Chat function failed');
      }

      const assistantContent = data.output?.content?.[0]?.text?.value || '[no reply]';
      const assistantMessage: Message = { role: 'assistant', content: assistantContent };
      
      setMessages([...updatedHistory, assistantMessage]);
      
      toast({
        title: "Response received",
        description: "The AI assistant has responded to your message.",
      });

    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Add error message to chat
      const errorResponse: Message = { 
        role: 'assistant', 
        content: `Sorry, I encountered an error: ${errorMessage}` 
      };
      setMessages([...updatedHistory, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>AI Assistant Chat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="assistant-select" className="block text-sm font-medium mb-2">
              Choose Assistant:
            </label>
            <Select value={assistantType} onValueChange={setAssistantType}>
              <SelectTrigger id="assistant-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="career">Career Compass Pro</SelectItem>
                <SelectItem value="learning">Einstein Learning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={clearChat} variant="outline" disabled={isLoading || messages.length === 0}>
            Clear Chat
          </Button>
        </div>

        <div className="border rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">
              Start a conversation with your chosen AI assistant...
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-white dark:bg-gray-800 border'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">
                    {message.role === 'user' ? 'You' : assistantType === 'career' ? 'Career Compass Pro' : 'Einstein Learning'}
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask ${assistantType === 'career' ? 'Career Compass Pro' : 'Einstein Learning'}...`}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Thinking...
              </>
            ) : (
              'Send'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;