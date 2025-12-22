import { Button } from "@/components/ui/button";

const WhyTrack = () => {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="container max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Maybe it’s just us. But we tracked the wrong things.
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Steps. Sleep. Workouts. Spending.</br>
          We log habits, chase streaks, measure progress.
        </p>

       <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Not because tracking is the goal —</br>
          but because it interrupts autopilot.
        </p>

        <p className="text-lg text-muted-foreground mb-8">
          Fiftytwoormore is a simple weekly log for couples—no coaching, no quizzes. 
          Just a quiet way to stay connected.
        </p>

        <Button 
          variant="outline" 
          size="lg" 
          onClick={scrollToFeatures}
          className="rounded-full"
        >
          See how it works
        </Button>
      </div>
    </section>
  );
};

export default WhyTrack;
