import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            <img 
              src="/logo.png" 
              alt="Jeff Dickerson Logo"
              className="h-20 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/research" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Research</Link>
            <Link to="/case-studies" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Case Studies</Link>
            <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Blog</Link>
            <a 
              href="https://cal.com/jeffdickerson/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-full hover:opacity-90 transition-opacity inline-block text-center no-underline hover:no-underline font-medium"
            >
              Book a Call
            </a>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="dark:text-white"/> : <Menu className="dark:text-white"/>}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-t dark:border-slate-700">
            <div className="flex flex-col space-y-4 p-6">
              <Link to="/research" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Research</Link>
              <Link to="/case-studies" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Case Studies</Link>
              <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Blog</Link>
              <a 
                href="https://cal.com/jeffdickerson/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-full hover:opacity-90 transition-opacity inline-block text-center no-underline hover:no-underline font-medium"
              >
                Book a Call
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};