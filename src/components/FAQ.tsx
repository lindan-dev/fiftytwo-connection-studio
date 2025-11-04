import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Is this about sex?",
      answer: "It's about connection. But yes, that too. We believe intimacy is a crucial part of a healthy relationship, and that includes physical connection. The app helps you make time for it without being weird about it.",
    },
    {
      question: "Why 52?",
      answer: "Because there are 52 weeks in a year — and research suggests that connecting about once a week is enough to keep couples happy and close. More can be great, but it doesn't make you happier. fiftytwoormore is built around that simple rhythm: a gentle reminder to show up for each other once a week. If you manage that, you're already doing better than most.",
    },
    {
      question: "Who can see our data?",
      answer: "Only you and your partner. We don't track your data, sell it, or share it with anyone. Your streak is yours. Period.",
    },
    {
      question: "Do we need to use it every week?",
      answer: "Only if you want to keep your streak 😉 Life happens. The goal is consistency, not perfection. Use it as often as works for you.",
    },
    {
      question: "How much does it cost?",
      answer: "The beta is completely free. We'll figure out pricing later, but it'll always be reasonable. We're building this for couples, not investors.",
    },
    {
      question: "What if my partner isn't into apps?",
      answer: "Fair question! The app is designed to be simple and unintrusive. You can both use it, or just one of you can track for both. Whatever works.",
    },
    {
      question: "Can we customize our goals?",
      answer: "Eventually, yes! For the beta, we're starting with the 52-week challenge (once a week), but we're planning to add custom frequencies based on your feedback.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="container max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          A few questions you might have
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-12">
          We're here to help.
        </p>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-xl px-6 shadow-soft"
            >
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
