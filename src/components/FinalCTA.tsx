import { Button } from "@/components/ui/button";
const FinalCTA = () => {
  const scrollToSignup = () => {
    document.getElementById("beta-signup")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="py-12 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-6xl font-bold mb-6">
          Reconnect. Laugh. Keep it real.
        </h2>
        <p className="text-xl lg:text-2xl text-muted-foreground mb-8">
          Join 100 couples who are making time for what matters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8" onClick={scrollToSignup}>
            Join the closed beta ❤️
          </Button>
          
        </div>
      </div>
    </section>;
};
export default FinalCTA;