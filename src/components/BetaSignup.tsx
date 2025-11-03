import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  partnerName: z.string().trim().max(100, "Partner name must be less than 100 characters").optional(),
  relationshipDuration: z.string().trim().max(100, "Relationship duration must be less than 100 characters").optional(),
});

const BetaSignup = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    partnerName: "",
    relationshipDuration: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupCount, setSignupCount] = useState<number | null>(null);
  const totalSeats = 100;

  useEffect(() => {
    const fetchSignupCount = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-beta-signups-count');
        if (!error && data) {
          setSignupCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch signup count');
      }
    };

    fetchSignupCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = signupSchema.parse(formData);

      // Insert into database
      const { error } = await supabase.from("beta_signups").insert({
        name: validatedData.name,
        email: validatedData.email,
        partner_name: validatedData.partnerName || null,
        relationship_duration: validatedData.relationshipDuration || null,
      });

      if (error) throw error;

      // Success
      toast({
        title: "Thanks for joining! ❤️",
        description: "We'll get back to you within a few days.",
      });
      
      // Update count and reset form
      if (signupCount !== null) {
        setSignupCount(signupCount + 1);
      }
      setFormData({ name: "", email: "", partnerName: "", relationshipDuration: "" });
    } catch (error) {
      console.error("Error submitting beta signup:", error);
      
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const seatsLeft = signupCount !== null ? Math.max(0, totalSeats - signupCount) : null;

  return (
    <section id="beta-signup" className="py-20 px-6">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Join our closed beta.</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              We're inviting 100 couples to test fiftytwoormore before launch.
            </p>
            {seatsLeft !== null && seatsLeft > 0 && (
              <p className="text-xl font-bold text-primary">
                Only {seatsLeft} {seatsLeft === 1 ? 'seat' : 'seats'} left - sign up now!
              </p>
            )}
            {seatsLeft === 0 && (
              <p className="text-xl font-bold text-muted-foreground">
                Beta is now full - join the waitlist!
              </p>
            )}
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

          <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Apply for Beta Access ❤️"}
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
