import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useParams } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-[704px] mx-auto">
          <span className="text-sm text-gray-500">{post.date}</span>
          <h1 className="text-4xl font-bold mt-2 mb-6">{post.title}</h1>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-8"
          />
          <p className="text-gray-600 text-lg mb-4">{post.description}</p>
          {/* This is where the full blog content would go */}
          <p className="text-gray-600 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;