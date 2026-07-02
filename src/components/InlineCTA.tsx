import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/appLinks";

interface InlineCTAProps {
  label: string;
  reassurance?: string;
}

const InlineCTA = ({ label, reassurance }: InlineCTAProps) => {
  return (
    <div className="py-12 px-6 text-center">
      <Button size="lg" className="text-lg px-8" onClick={() => window.open(APP_URL, "_blank")}>
        {label}
      </Button>
      {reassurance && (
        <p className="mt-3 text-sm text-muted-foreground">{reassurance}</p>
      )}
    </div>
  );
};

export default InlineCTA;
