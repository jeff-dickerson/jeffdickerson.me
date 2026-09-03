import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
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
            <Link to="/research" className="text-muted-foreground hover:text-primary transition-colors">Research</Link>
            <Link to="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link>
            <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <a
              href="https://cal.com/jeffdickerson/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors inline-block text-center"
            >
              Book a Call
            </a>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="text-foreground" /> : <Menu className="text-foreground" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border">
            <div className="flex flex-col space-y-4 p-6">
              <Link to="/research" className="text-muted-foreground hover:text-primary transition-colors">Research</Link>
              <Link to="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <a
                href="https://cal.com/jeffdickerson/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors inline-block text-center"
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
