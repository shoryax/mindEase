import { Button } from "./ui/button";

export default function Ready() {
  return (
    <section className="relative z-10 px-6 lg:px-12 py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl lg:text-7xl font-light text-foreground mb-6 leading-tight">
          ready when
          <br />
          <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">you are</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto font-light">
          no pressure. just a conversation to see if we're a good fit.
        </p>
        <Button size="lg" className="bg-foreground text-background hover:opacity-90 rounded-full px-12 h-14 text-base font-medium">
          Book Free Consultation
        </Button>
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span>no commitment</span>
          <span>·</span>
          <span>100% confidential</span>
          <span>·</span>
          <span>insurance accepted</span>
        </div>
      </div>
    </section>
  );
}
