import { Flame, Lock, Cake } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Flame,
      title: "Your streak, your story",
      description: "Track how often you make time for each other. No pressure, just progress.",
    },
    {
      icon: Lock,
      title: "Private. Always.",
      description: "Only you two can see your data. No tracking, no ads, no bullshit.",
    },
    {
      icon: Cake,
      title: "Celebrate milestones",
      description: "Birthdays, anniversaries, and all the small wins that matter.",
    },
  ];

  return (
    <section id="features" className="py-12 px-6 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          Keep it simple, keep it private.
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16">
          Everything you need, nothing you don't.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
