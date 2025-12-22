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
          Maybe it’s just us. But we tracked the wrong things.
        </p>

        <div className="mb-8">
          <p className="text-muted-foreground mb-4">We track:</p>
          <div className="flex flex-wrap justify-center gap-3 text-foreground">
            <span className="px-4 py-2 bg-secondary/50 rounded-full">steps</span>
            <span className="px-4 py-2 bg-secondary/50 rounded-full">sleep</span>
            <span className="px-4 py-2 bg-secondary/50 rounded-full">spending</span>
            <span className="px-4 py-2 bg-secondary/50 rounded-full">workouts</span>
            <span className="px-4 py-2 bg-secondary/50 rounded-full text-primary font-medium">…but not intimacy</span>
          </div>
        </div>

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
