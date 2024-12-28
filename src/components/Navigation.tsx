import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            YourName
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Book a Call
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t">
            <div className="flex flex-col space-y-4 p-6">
              <Link to="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                Book a Call
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};