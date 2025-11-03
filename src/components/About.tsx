const About = () => {
  return (
    <section className="py-20 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">52 or more.</h2>
        <div className="space-y-4 text-lg lg:text-xl text-muted-foreground">
          <p>The challenge? Once a week, every week — or more if you can.</p>
          <p>Log it, keep your streak, and celebrate consistency — not perfection.</p>
        </div>
        <div className="mt-12 bg-primary/10 rounded-2xl p-8 lg:p-12">
          <div className="text-6xl font-bold text-primary mb-2">23</div>
          <div className="text-2xl font-semibold">weeks</div>
          <div className="mt-4 text-muted-foreground">Your streak, your story</div>
        </div>
      </div>
    </section>
  );
};

export default About;
