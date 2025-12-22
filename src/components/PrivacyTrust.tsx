import { ShieldCheck } from "lucide-react";

const PrivacyTrust = () => {
  return (
    <section className="py-16 px-6">
      <div className="container max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h2 className="text-3xl lg:text-4xl font-bold">
            Nothing to see here. Seriously.
          </h2>
        </div>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Logging is binary — yes or no, once a week. That's it. No journaling, 
          no details, no data anyone would ever want to see.
        </p>

        <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
          <p className="text-muted-foreground mb-4 font-medium">What we don't track:</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>No descriptions</li>
            <li>No notes</li>
            <li>No messages</li>
            <li>No details</li>
            <li>No sharing</li>
          </ul>
        </div>

        <div className="space-y-3 text-muted-foreground mb-8">
          <p>Other users can't see anything.</p>
          <p>Friends can't see anything.</p>
          <p>Even we can't see individual activity.</p>
        </div>

        <p className="text-lg font-medium text-foreground">
          If it feels private to you, it stays private here.
        </p>
      </div>
    </section>
  );
};

export default PrivacyTrust;
