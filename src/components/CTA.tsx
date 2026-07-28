// Deliberately fixed dark palette — this full-bleed band should stay dark
// in both themes (with an inverse light button), not flip with the
// design tokens like the rest of the site.
export const CTA = () => {
  return (
    <section className="py-20 bg-neutral-950 text-neutral-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fade-up">
            Let's challenge your product.
          </h2>
          <p className="text-lg mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Fresh eyes help generate new perspectives. Book a free call in which we identify opportunities and broken flows in your web app.
          </p>
          <a 
            href="https://cal.com/jeffdickerson/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-neutral-50 text-neutral-950 rounded-full hover:bg-neutral-200 transition-colors animate-fade-up inline-block text-center"
            style={{ animationDelay: "0.4s" }}
          >
            Schedule Free Call
          </a>
        </div>
      </div>
    </section>
  );
};