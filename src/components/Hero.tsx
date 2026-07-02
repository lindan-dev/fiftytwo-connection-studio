import { Button } from "@/components/ui/button";
import appMockup from "@/assets/app-mockup.png";

const APP_URL = "https://app.fiftytwoormore.com";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="px-6 py-16 lg:py-20">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-in relative z-10">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Because done is better than perfect ❤️
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8">
              The app for couples who want to make time for each other — and laugh about it too.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => window.open(APP_URL, "_blank")}
              >
                Get the App ❤️
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                onClick={() => scrollToSection("features")}
              >
                Learn more
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Built for real couples. Used privately.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end relative z-0">
            <img
              src={appMockup}
              alt="fiftytwoormore app showing streak calendar and milestones"
              className="max-w-2xl w-full lg:w-[85%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
