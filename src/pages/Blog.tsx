import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const categories = [
  "All Categories",
  "Engineering",
  "Future of Work",
  "Systems",
  "Machine Learning",
  "Generative AI",
  "Crypto/Blockchain"
];

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All Categories");
  const navigate = useNavigate();
  
  const filteredPosts = selectedTag === "All Categories"
    ? blogPosts
    : blogPosts.filter(post => post.tag === selectedTag);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-[704px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 animate-fade-up text-gray-900 dark:text-white">
            Capturing my learning, <br /> one post at a time.
          </h1>

          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Categories:</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedTag === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="group w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1 space-y-3 order-2 sm:order-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-base">
                        {post.description}
                      </p>
                      <Badge variant="secondary" className="text-sm px-3 py-0.5">
                        {post.tag}
                      </Badge>
                    </div>
                    <div className="w-full sm:w-[280px] flex-shrink-0 order-1 sm:order-2">
                      <img
                        src={post.image}
                        alt=""
                        className="w-full h-48 sm:h-full object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
};

export default Blog;