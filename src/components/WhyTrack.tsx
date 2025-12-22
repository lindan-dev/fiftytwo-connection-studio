import { Button } from "@/components/ui/button";

const WhyTrack = () => {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="container max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">We track everything that matters. Except this.</h2>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Somewhere along the way, life goes on autopilot. Work, kids, exhaustion—and suddenly you realize it's been...
          a while. Not because anything's wrong. Just because no one was paying attention.
        </p>

        <p className="text-lg text-muted-foreground mb-8">
          Fiftytwoormore is a simple weekly log for couples—no coaching, no quizzes. Just a quiet way to stay connected.
        </p>

        <Button variant="outline" size="lg" onClick={scrollToFeatures} className="rounded-full">
          See how it works
        </Button>
      </div>
    </section>
  );
};

export default WhyTrack;
