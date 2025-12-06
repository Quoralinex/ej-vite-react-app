import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NEWSLETTER_ENDPOINT = "/api/contact"; // Cloudflare Pages Function (see below)

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!consent) {
      setStatus("error");
      setMessage("Please confirm you consent to us contacting you by email.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          email,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage("Thanks for subscribing. Please check your email for any confirmation.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Please try again in a few minutes.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-medium">
        Stay updated
      </label>
      <p className="text-xs text-muted-foreground">
        Subscribe to receive news, updates and resources. We respect your privacy. Unsubscribe at any time.
      </p>
      <Input
        type="email"
        required
        placeholder="hello.equitable-journeys@quoralinex.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          className="mt-0.5"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          I agree that Equitable Journeys (operated by Quoralinex) may contact me by email with updates and resources.
        </span>
      </label>
      <Button type="submit" size="sm" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </Button>
      {status !== "idle" && (
        <p
          className={`text-xs ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
