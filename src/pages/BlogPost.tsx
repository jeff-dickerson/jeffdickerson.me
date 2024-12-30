import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentId = Number(id);
  const post = blogPosts.find(post => post.id === currentId);
  
  const prevPost = blogPosts.find(post => post.id === currentId - 1);
  const nextPost = blogPosts.find(post => post.id === currentId + 1);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-[704px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => navigate('/blog')}
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </button>
            <Badge variant="secondary" className="text-sm px-3 py-0.5">
              {post.tag}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{post.description}</p>

          <div className="flex items-center gap-3 mb-8">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Author" />
              <AvatarFallback>KM</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Konstantin Münster</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-8"
          />

          {/* This is where the full blog content would go */}
          <p className="text-gray-600 text-lg mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">Web Development</Badge>
            <Badge variant="outline">{post.tag}</Badge>
          </div>

          <Pagination>
            <PaginationContent>
              {prevPost && (
                <PaginationItem>
                  <PaginationPrevious 
                    href={`/blog/${prevPost.id}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${prevPost.id}`);
                    }}
                  />
                </PaginationItem>
              )}
              {nextPost && (
                <PaginationItem>
                  <PaginationNext 
                    href={`/blog/${nextPost.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${nextPost.id}`);
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;