import { Heart } from "lucide-react";
import progressCard from "@/assets/progress-card.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="py-6 lg:py-8 px-4 lg:px-6">
      <div className="container max-w-4xl mx-auto text-center">
        {/* 1. Title block */}
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">52 or more.</h2>
        <div className="space-y-3 lg:space-y-4 text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed">
          <p>The challenge? Once a week, every week — or more if you can.</p>
          <p>Log it, keep your streak, and celebrate consistency — not perfection.</p>
        </div>

        {/* 2. Progress card */}
        <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 xl:mb-16 flex justify-center px-0 lg:px-4">
          <img
            src={progressCard}
            alt="Progress tracking showing 41/52 this year"
            className="w-full max-w-3xl rounded-xl lg:rounded-2xl shadow-card"
          />
        </div>

        {/* 3. Tagline transition */}
        <p className="text-base lg:text-lg text-warm-text-light py-4 lg:py-6 px-4">
          There's a reason we say once a week — science agrees.
        </p>

        {/* 4. Why once a week explanation block */}
        <div className="bg-beige rounded-xl lg:rounded-2xl shadow-soft p-6 lg:p-8 max-w-3xl mx-auto my-4 lg:my-6">
          <div className="flex items-center justify-center gap-2 mb-4 lg:mb-6">
            <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-primary fill-primary" />
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-warm-text">
              Why once a week?
            </h3>
          </div>
          
          <div className="space-y-3 lg:space-y-4 text-base lg:text-lg text-warm-text leading-relaxed">
            <p>
              Because once a week is often enough.
            </p>
            <p>
              Research shows that couples who connect regularly — around once per week — report higher happiness and closeness than those who do it less often.
            </p>
            <p>
              It's not about performance, it's about rhythm.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="link" 
                className="mt-6 lg:mt-8 text-primary hover:text-primary/80 text-base lg:text-lg font-medium min-h-[44px] min-w-[44px]"
              >
                Learn more →
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-full lg:max-w-2xl w-full h-full lg:h-auto max-h-[100vh] lg:max-h-[90vh] overflow-y-auto m-0 lg:m-4 rounded-none lg:rounded-lg p-6 lg:p-8 animate-in slide-in-from-bottom lg:slide-in-from-bottom-0 fade-in duration-300">
              <DialogHeader>
                <DialogTitle className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 lg:mb-6 text-left">
                  Once a week makes a difference. Science says so.
                </DialogTitle>
                <DialogDescription className="text-left space-y-4 lg:space-y-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    You don't need to overcomplicate it — research consistently shows that couples who are intimate about once a week tend to be happier and feel closer than those who do it less often.
                  </p>
                  <p>
                    A large study by Amy Muise, Ulrich Schimmack & Emily Impett (2016) found that sexual activity was positively linked to relationship satisfaction — but that the benefits leveled off at around once per week. More didn't necessarily add more happiness.
                  </p>
                  <p>
                    Other studies have found the same: regular connection — emotional or physical — supports long-term closeness, while pressure or high expectations don't.
                  </p>
                  <p className="font-medium text-foreground">
                    So fiftytwoormore isn't about numbers. It's about rhythm — one shared moment each week that keeps you connected.
                  </p>
                  
                  <div className="mt-6 lg:mt-8 pt-6 border-t border-border">
                    <p className="text-sm lg:text-base text-muted-foreground font-medium mb-3">Sources:</p>
                    <ul className="text-xs lg:text-sm text-muted-foreground space-y-2 list-none leading-relaxed">
                      <li>– Muise A., Schimmack U., Impett E. (2016) Sexual Frequency Predicts Greater Well-Being, But More Is Not Always Better.</li>
                      <li>– Society for Personality and Social Psychology (2015): Couples Who Have Sex Weekly Are Happiest.</li>
                      <li>– van Lankveld J. et al. (2018): The Associations of Intimacy and Sexuality in Daily Life.</li>
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default About;
