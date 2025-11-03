import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const BetaSignup = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    partnerName: "",
    relationshipDuration: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    toast({
      title: "Thanks for joining! ❤️",
      description: "We'll get back to you within a few days.",
    });
    setFormData({ name: "", email: "", partnerName: "", relationshipDuration: "" });
  };

  return (
    <section id="beta-signup" className="py-20 px-6">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Join our closed beta.</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              We're inviting 100 couples to test fiftytwoormore before launch.
            </p>
            <p>
              You'll get early access, and we'll get your honest feedback to make it even better.
            </p>
            <p className="font-semibold">It's private, free, and takes 2 minutes to join.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jamie"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Your Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="jamie@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnerName">Partner's Name (optional)</Label>
            <Input
              id="partnerName"
              value={formData.partnerName}
              onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
              placeholder="Alex"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationshipDuration">How long have you been together? (optional)</Label>
            <Input
              id="relationshipDuration"
              value={formData.relationshipDuration}
              onChange={(e) => setFormData({ ...formData, relationshipDuration: e.target.value })}
              placeholder="e.g., 3 years"
            />
          </div>

          <Button type="submit" size="lg" className="w-full text-lg">
            Apply for Beta Access ❤️
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            We'll get back to you within a few days.
          </p>
        </form>
      </div>
    </section>
  );
};

export default BetaSignup;
