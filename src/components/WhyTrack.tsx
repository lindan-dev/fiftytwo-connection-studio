import { Button } from "@/components/ui/button";

const WhyTrack = () => {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="container max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">We track everything that matters. Except this.</h2>

        <div className="text-left max-w-2xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Maybe it's just us. But we tracked the wrong things. Steps. Sleep. Workouts. Spending. We log habits, chase
            streaks, measure progress.
          </p>

          <p>
            Not because tracking is the goal, but because it interrupts autopilot. Tracking makes invisible patterns
            visible.It reminds us why something matters. It turns "we should" into "we noticed."
          </p>

          <p>
            Inspired by research on habits, including{" "}
            <a
              href="https://www.melrobbins.com/episode/episode-347/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              this conversation
            </a>{" "}
            on the Mel Robbins Podcast, we realized something:
          </p>

          <p>We apply this logic to almost everything. Except intimacy.</p>

          <p className="text-foreground font-medium">And that's the gap Fiftytwoormore exists to explore.</p>

          <p>Helping us switch from autopilot to intention. Once a week. Low bar. High awareness.</p>
        </div>

        <div className="mt-10">
          <Button variant="outline" size="lg" onClick={scrollToFeatures} className="rounded-full">
            See how it works
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyTrack;
