export type BlogPost = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  tag: string;
  content?: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "AI Engineering: Building Next-Gen Solutions",
    description: "Deep dive into the principles and practices of modern AI Engineering and its impact on software development.",
    date: "March 15, 2024",
    image: "/placeholder.svg",
    tag: "Engineering",
    content: `
      AI Engineering is revolutionizing how we build and deploy software solutions. This post explores the key concepts and best practices in AI Engineering.

      ## What is AI Engineering?

      AI Engineering combines software engineering principles with machine learning expertise to create robust, scalable AI solutions. It's about more than just implementing algorithms – it's about building production-ready systems that can deliver real value.

      ## Key Components

      1. **Model Development**: Creating and fine-tuning AI models
      2. **Infrastructure**: Setting up scalable computing resources
      3. **Data Pipeline**: Managing data collection and processing
      4. **Monitoring**: Ensuring model performance and reliability

      ## Best Practices

      - Start with clear business objectives
      - Build robust data pipelines
      - Implement continuous monitoring
      - Plan for model updates and maintenance
    `
  },
  {
    id: 2,
    title: "The Future of Work with AI Integration",
    description: "Exploring how AI is transforming workplace productivity and decision-making processes.",
    date: "March 12, 2024",
    image: "/placeholder.svg",
    tag: "Future of Work",
    content: `
      The integration of AI into workplace processes is fundamentally changing how we work. Let's explore the key trends and implications.

      ## Major Trends

      1. **Automated Decision Support**
      2. **Intelligent Process Automation**
      3. **Enhanced Collaboration Tools**

      ## Implementation Strategies

      - Start with high-impact, low-risk areas
      - Focus on employee training and adoption
      - Monitor and measure productivity gains
    `
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
