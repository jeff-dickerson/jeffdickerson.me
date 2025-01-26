import { BackgroundGradient } from "aceternity-ui";

export const CombiningSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">
          Combining product and development.
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          I appreciate the opportunity to serve clients and industries through ai agency in a way that traditional workflows or software previously couldn't
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <BackgroundGradient className="rounded-[22px] p-1 bg-white dark:bg-zinc-900">
            <div className="w-[384px] h-[384px] p-[40px_32px] bg-white dark:bg-zinc-900 rounded-[20px]">
              <h3 className="text-2xl font-bold mb-6">You primarily need a<br /><span className="text-primary">Product Manager</span></h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  I listen to user feedback,<br />develop solutions, and<br />manage the roadmap.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  With your input, I can quickly<br />evaluate on ideas we developed.
                </li>
              </ul>
              <button className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                Schedule free call
              </button>
            </div>
          </BackgroundGradient>
          
          <BackgroundGradient className="rounded-[22px] p-1 bg-white dark:bg-zinc-900">
            <div className="w-[384px] h-[384px] p-[40px_32px] bg-white dark:bg-zinc-900 rounded-[20px]">
              <h3 className="text-2xl font-bold mb-6">You primarily need a<br /><span className="text-primary">Web Developer</span></h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  I design and implement features<br />based on your existing designs.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  Using modern tech stack to speed up<br />process, there are existing puzzles<br />to deal with.
                </li>
              </ul>
              <button className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                Schedule free call
              </button>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </section>
  );
};