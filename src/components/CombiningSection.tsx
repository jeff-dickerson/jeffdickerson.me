import { BackgroundGradient } from "@/components/ui/background-gradient";

export const CombiningSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">
          Combining product and development.
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          I appreciate the opportunity to serve clients and industries through ai agency in a way that traditional workflows or software previously couldn't
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <BackgroundGradient className="rounded-[22px] bg-card">
            <div className="w-[384px] h-[384px] p-[40px_32px] rounded-[20px]">
              <h3 className="text-2xl font-bold mb-6">You primarily need a<br /><span className="text-primary">AI Architect</span></h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  I listen to org feedback,<br />design end-to-end AI solutions, <br /> and docs, artifacts and MLOps.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  With your input, I can align<br />initiatives to outcomes.
                </li>
              </ul>
              <a 
                href="https://cal.com/jeffdickerson/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors inline-block text-center"
              >
                Schedule free call
              </a>
            </div>
          </BackgroundGradient>
          
          <BackgroundGradient className="rounded-[22px] bg-card">
            <div className="w-[384px] h-[384px] p-[40px_32px] rounded-[20px]">
              <h3 className="text-2xl font-bold mb-6">You primarily need a<br /><span className="text-primary">AI Engineer</span></h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  I design high-quality scalable<br />AI models for your objectives.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  Using optimized flow to speed up<br />time-to-value, for chosen PoC to<br /> production pipeline.
                </li>
              </ul>
              <a 
                href="https://cal.com/jeffdickerson/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors inline-block text-center"
              >
                Schedule free call
              </a>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </section>
  );
};