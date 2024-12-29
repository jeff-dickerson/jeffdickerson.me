export type BlogPost = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  tag: string;
};

export const blogPosts: BlogPost[] = [
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