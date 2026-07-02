import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/appLinks";

const FinalCTA = () => {
  return <section className="py-12 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-6xl font-bold mb-6">
          Reconnect. Laugh. Keep it real.
        </h2>
        <p className="text-xl lg:text-2xl text-muted-foreground mb-8">
          Making time for what matters, one week at a time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8" onClick={() => window.open(APP_URL, "_blank")}>
            Get Streaky 🔥
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Only you and your partner can see this.
        </p>
      </div>
    </section>;
};
export default FinalCTA;