import progressCard from "@/assets/progress-card.png";

const About = () => {
  return (
    <section className="pt-4 pb-12 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">52 or more.</h2>
        <div className="space-y-4 text-lg lg:text-xl text-muted-foreground">
          <p>The challenge? Once a week, every week — or more if you can.</p>
          <p>Log it, keep your streak, and celebrate consistency — not perfection.</p>
        </div>
        <div className="mt-12 flex justify-center">
          <img
            src={progressCard}
            alt="Progress tracking showing 41/52 this year"
            className="w-full max-w-3xl rounded-2xl shadow-card"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
