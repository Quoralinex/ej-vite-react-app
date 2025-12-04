import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Copy } from "lucide-react";

interface ExternalFrameProps {
  title: string;
  url: string;
  description?: string;
}

const ExternalFrame = ({ title, url, description }: ExternalFrameProps) => {
  const [copied, setCopied] = useState(false);

  const handleTopNav = () => {
    try {
      if (window.top) {
        (window.top as Window).location.href = url;
      } else {
        window.location.href = url;
      }
    } catch {
      window.location.href = url;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center gap-4">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
              <ExternalLink className="h-8 w-8 text-primary" />
            </div>
            <span className="text-2xl">{title}</span>
            {description && (
              <span className="text-base font-normal text-gray-600">
                {description}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Important:</strong> You must first be logged into ChatGPT for these custom GPTs to work properly.
            </p>
            <p className="text-sm text-blue-800">
              For security, ChatGPT opens in a new tab. If it doesn't open, your browser may have blocked pop-ups.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="flex items-center gap-2" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open {title} in new tab
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={handleTopNav}>
              Open here (leave editor)
            </Button>
            <Button variant="outline" size="lg" onClick={handleCopy} className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              {copied ? "Link Copied!" : "Copy Link"}
            </Button>
          </div>

          <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
            <p className="font-semibold mb-1">Direct Link:</p>
            <p className="break-all">{url}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Login to ChatGPT First</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Please log into ChatGPT below before using the custom GPT tools:
          </p>
          <div className="border rounded-lg overflow-hidden">
            <iframe 
              src="https://chatgpt.com/" 
              className="w-full h-96 border-0"
              title="ChatGPT Login"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why can't this open in a frame?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <p>ChatGPT blocks embedding in frames for security reasons to prevent clickjacking attacks.</p>
          <p>This is a standard security practice for many websites, so the tool must open in a new tab.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExternalFrame;
