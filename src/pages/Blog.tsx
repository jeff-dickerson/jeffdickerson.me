import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type BlogPost = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  tag: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Interactive UIs with React",
    description: "Learn how to create engaging user interfaces using React and modern web technologies.",
    date: "March 15, 2024",
    image: "/placeholder.svg",
    tag: "Engineering"
  },
  {
    id: 2,
    title: "The Future of Remote Work",
    description: "Exploring upcoming trends and technologies shaping how we work remotely.",
    date: "March 12, 2024",
    image: "/placeholder.svg",
    tag: "Future of Work"
  },
  {
    id: 3,
    title: "Understanding System Design",
    description: "A comprehensive guide to designing scalable systems.",
    date: "March 10, 2024",
    image: "/placeholder.svg",
    tag: "Systems"
  },
  {
    id: 4,
    title: "Introduction to Large Language Models",
    description: "Understanding the fundamentals of LLMs and their applications.",
    date: "March 8, 2024",
    image: "/placeholder.svg",
    tag: "Machine Learning"
  },
  {
    id: 5,
    title: "The Rise of AI Agents",
    description: "Exploring how AI agents are transforming various industries.",
    date: "March 5, 2024",
    image: "/placeholder.svg",
    tag: "Generative AI"
  },
  {
    id: 6,
    title: "Web3 and the Future of Finance",
    description: "Understanding blockchain technology and its impact on financial systems.",
    date: "March 3, 2024",
    image: "/placeholder.svg",
    tag: "Crypto/Blockchain"
  }
];

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

          {/* Categories filter */}
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

          {/* Blog posts grid */}
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div 
                key={post.id}
                className="group bg-white border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg h-[280px] w-[704px]"
              >
                <div className="p-8 h-full">
                  <div className="flex gap-8 h-full">
                    <div className="flex-1 space-y-4">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <h3 className="text-3xl font-bold group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {post.description}
                      </p>
                      <Badge variant="secondary" className="text-sm px-4 py-1">
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