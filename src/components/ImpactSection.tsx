export const ImpactSection = () => {
  const steps = [
    { number: "1", title: "Together, we identify major opportunities for your product." },
    { number: "2", title: "We agree upon to turn your product into a new chapter." },
    { number: "3", title: "Once committed, I start coding, exploring and polishing." },
    { number: "4", title: "We gather additional user feedback and keep improving." }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 animate-fade-up">Where my work has the most impact.</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold mb-4 text-primary">Startups</h3>
            <h3 className="text-2xl font-bold mb-6">Scale-ups</h3>
            <p className="text-gray-600">
              You see a market opportunity. Now you are in the midst of building the product and staffing a team? In the early days, shipping fast and collecting feedback is key. I help you in reaching your vision — which is no surprise!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="bg-white p-6 rounded-xl shadow-sm animate-fade-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">
                {step.number}
              </div>
              <p className="font-medium">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};