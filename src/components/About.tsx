export const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl font-bold mb-6">Hey, I am YourName</h2>
            <p className="text-xl text-gray-600 mb-6">
              A freelance product engineer — or to put it simply: a product manager who codes.
            </p>
            <p className="text-gray-600 mb-6">
              My passion has always been at the intersection of product and tech development. I love talking to users and developing ideas as much as coding with a space to explore coming to the best solution.
            </p>
            <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"
              alt="Working on laptop"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};