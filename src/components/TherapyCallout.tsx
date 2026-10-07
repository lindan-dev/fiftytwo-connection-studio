import { Heart } from "lucide-react";
import { SUPPORT_URL } from "@/lib/appLinks";

const TherapyCallout = () => {
  return (
    <section className="py-16 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-primary rounded-3xl p-12 lg:p-16 text-center text-primary-foreground shadow-card">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Cheaper than therapy ❤️
          </h2>
          <div className="space-y-4 text-lg lg:text-xl opacity-95">
            <p>
              Making time for each other — intimately — will save you hours (and money) with a
              therapist.
            </p>
            <p className="font-semibold">And honestly, it's a lot more fun.</p>
          </div>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-primary-foreground/50 px-6 py-3 text-base font-semibold transition-colors hover:bg-primary-foreground/10"
          >
            <Heart className="w-4 h-4" fill="currentColor" />
            Support our project
          </a>
        </div>
      </div>
    </section>
  );
};

export default TherapyCallout;

