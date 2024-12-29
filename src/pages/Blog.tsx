import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  
  // Filter posts based on selected tag
  const filteredPosts = selectedTag === "All Categories"
    ? blogPosts
    : blogPosts.filter(post => post.tag === selectedTag);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 animate-fade-up">Blog</h1>
          <p className="text-lg text-gray-600 mb-8 animate-fade-up">
            Learn with me. I regularly share my learnings on how to build interactive features with a product-first mindset.
          </p>

          {/* Categories filter */}
          <div className="mb-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Card 
                key={post.id} 
                className="transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <CardHeader>
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <Badge variant="secondary">{post.tag}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;