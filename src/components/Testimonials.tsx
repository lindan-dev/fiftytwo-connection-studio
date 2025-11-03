const Testimonials = () => {
  const testimonials = [
    {
      quote: "It started as a joke, now it's the best part of our week.",
      author: "Sarah & Mike",
      emoji: "😊",
    },
    {
      quote: "We talk more. We laugh more. It's weirdly simple.",
      author: "Jamie & Alex",
      emoji: "💕",
    },
    {
      quote: "Cheaper than therapy — and way more fun.",
      author: "Chris & Jordan",
      emoji: "😄",
    },
    {
      quote: "Finally, an app that gets it. No pressure, just us.",
      author: "Taylor & Robin",
      emoji: "✨",
    },
  ];

  return (
    <section className="py-16 px-6 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          Loved by couples who keep it real.
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Real stories from real couples.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{testimonial.emoji}</div>
              <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
              <p className="text-muted-foreground font-medium">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
