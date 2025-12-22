import { Button } from "@/components/ui/button";

interface InlineCTAProps {
  label: string;
  reassurance?: string;
}

const InlineCTA = ({ label, reassurance }: InlineCTAProps) => {
  const scrollToSignup = () => {
    document.getElementById("beta-signup")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="py-12 px-6 text-center">
      <Button size="lg" className="text-lg px-8" onClick={scrollToSignup}>
        {label}
      </Button>
      {reassurance && (
        <p className="mt-3 text-sm text-muted-foreground">{reassurance}</p>
      )}
    </div>
  );
};

export default InlineCTA;
