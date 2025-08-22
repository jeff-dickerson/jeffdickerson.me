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
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentId = Number(id);
  const post = blogPosts.find(post => post.id === currentId);
  
  const prevPost = blogPosts.find(post => post.id === currentId + 1); // Increment for older posts
  const nextPost = blogPosts.find(post => post.id === currentId - 1); // Decrement for newer posts

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-[704px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => navigate('/blog')}
              className="flex items-center text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </button>
            <Badge variant="secondary" className="text-sm px-3 py-0.5">
              {post.tag}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>
          <p className="text-gray-600 text-lg mb-6 dark:text-gray-400">{post.description}</p>

          <div className="flex items-center gap-3 mb-8">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Author" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium dark:text-white">Jeff Dickerson</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
            </div>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-8"
          />

          {/* Display the actual blog content */}
          <div className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold 
            prose-h1:text-4xl prose-h1:mb-12 prose-h1:mt-16
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
            prose-p:text-lg prose-p:mb-8 prose-p:leading-loose
            prose-li:mb-4 prose-li:leading-relaxed
            prose-ul:my-8 prose-ul:pl-8
            prose-ol:my-8 prose-ol:pl-8
            prose-blockquote:my-12 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-lg
            prose-strong:text-primary dark:prose-strong:text-primary-foreground
            prose-pre:my-8 prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:p-6 prose-pre:rounded-lg
          ">
            {post.content ? (
              <div className="space-y-6">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Content coming soon...
              </p>
            )}
          </div>

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
