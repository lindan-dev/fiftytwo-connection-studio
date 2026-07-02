import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/appLinks";

const GetStarted = () => {
  return (
    <section id="get-started" className="py-16 px-6">
      <div className="container max-w-2xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready when you are.</h2>
        <div className="space-y-3 text-lg text-muted-foreground mb-8">
          <p>Create your account, invite your partner, and log your first moment - takes about two minutes.</p>
          <p className="font-semibold">It's private, and it's free.</p>
        </div>

        <Button size="lg" className="text-lg px-8" onClick={() => window.open(APP_URL, "_blank")}>
          Get Streaky 🔥
        </Button>

        <ul className="mt-8 text-sm text-muted-foreground space-y-1">
          <li>Private by default</li>
          <li>No explicit details</li>
          <li>No advice, no judgment</li>
        </ul>
      </div>
    </section>
  );
};

export default GetStarted;