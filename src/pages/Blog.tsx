import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-[704px] mx-auto">
          <h1 className="text-5xl font-bold mb-12 animate-fade-up">
            Capturing my Learning <br /> with Blog
          </h1>

          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-3">Categories:</h2>
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
                className="group bg-white border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg h-[280px] w-[704px] cursor-pointer"
              >
                <div className="p-6 h-full">
                  <div className="flex gap-6 h-full">
                    <div className="flex-1 space-y-3">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-base">
                        {post.description}
                      </p>
                      <Badge variant="secondary" className="text-sm px-3 py-0.5">
                        {post.tag}
                      </Badge>
                    </div>
                    <div className="w-[343.33px]">
                      <img
                        src={post.image}
                        alt=""
                        className="w-[343.33px] h-[228.89px] object-cover rounded-2xl"
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
    </div>
  );
};

export default Blog;