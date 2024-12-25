export const CombiningSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">
          Combining product and development.
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          I support you right where your challenges are — or might be in the future. Seamlessly switching between discovery and delivery.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-2xl font-bold mb-6">You primarily need a<br /><span className="text-primary">Product Manager</span></h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                I listen to user feedback, develop solutions, and manage the roadmap.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                With your input, I can quickly evaluate on ideas we developed.
              </li>
            </ul>
            <button className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Schedule free call
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-2xl font-bold mb-6">You primarily need a<br /><span className="text-primary">Web Developer</span></h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                I design and implement features based on your existing designs.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                Using modern tech stack to speed up process, there are existing puzzles to deal with.
              </li>
            </ul>
            <button className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Schedule free call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};