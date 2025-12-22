const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Log once a week",
      description: "Did something intimate happen? Yes or no.",
    },
    {
      number: "2",
      title: "See your rhythm",
      description: "No details. Just awareness.",
    },
    {
      number: "3",
      title: "Stay connected",
      description: "Consistency beats intensity.",
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
