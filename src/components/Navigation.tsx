import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Research", to: "/research" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Blog", to: "/blog" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `no-underline hover:no-underline transition-colors hover:text-primary ${
    isActive ? "text-primary" : "text-muted-foreground"
  }`;

const BookCall = () => (
  <Button asChild>
    <a href="https://cal.com/jeffdickerson/15min" target="_blank" rel="noopener noreferrer">
      Book a call
    </a>
  </Button>
);

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
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
            <BookCall />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 rounded-full hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="text-foreground" /> : <Menu className="text-foreground" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border">
            <div className="flex flex-col items-start space-y-4 p-6">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ))}
              <BookCall />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
