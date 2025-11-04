import { useState } from "react";
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
    <section className="py-8 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        {/* 1. Title block */}
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">52 or more.</h2>
        <div className="space-y-4 text-lg lg:text-xl text-muted-foreground">
          <p>The challenge? Once a week, every week — or more if you can.</p>
          <p>Log it, keep your streak, and celebrate consistency — not perfection.</p>
        </div>

        {/* 2. Progress card */}
        <div className="mt-12 mb-12 lg:mb-16 flex justify-center">
          <img
            src={progressCard}
            alt="Progress tracking showing 41/52 this year"
            className="w-full max-w-3xl rounded-2xl shadow-card"
          />
        </div>

        {/* 3. Tagline transition */}
        <p className="text-lg text-warm-text-light mt-4 mb-8">
          There's a reason we say once a week — science agrees.
        </p>

        {/* 4. Why once a week explanation block */}
        <div className="bg-beige rounded-2xl shadow-soft p-6 lg:p-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <h3 className="text-2xl lg:text-3xl font-bold text-warm-text">
              Why once a week?
            </h3>
          </div>
          
          <div className="space-y-4 text-base lg:text-lg text-warm-text leading-relaxed">
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
                className="mt-6 text-primary hover:text-primary/80 text-base lg:text-lg font-medium"
              >
                Learn more →
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl lg:text-3xl font-bold mb-4">
                  Once a week makes a difference. Science says so.
                </DialogTitle>
                <DialogDescription className="text-left space-y-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    You don't need to overcomplicate it — research consistently shows that couples who are intimate about once a week tend to be happier and feel closer than those who do it less often.
                  </p>
                  <p>
                    A large study by Amy Muise, Ulrich Schimmack & Emily Impett (2016) found that sexual activity was positively linked to relationship satisfaction — but that the benefits leveled off at around once per week. More didn't necessarily add more happiness.
                  </p>
                  <p>
                    Other studies have found the same: regular connection — emotional or physical — supports long-term closeness, while pressure or high expectations don't.
                  </p>
                  <p className="font-medium">
                    So fiftytwoormore isn't about numbers. It's about rhythm — one shared moment each week that keeps you connected.
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground font-medium mb-2">Sources:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-none">
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
