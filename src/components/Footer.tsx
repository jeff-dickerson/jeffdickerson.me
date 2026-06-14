import { Link } from "react-router-dom";

const CONTACT_EMAIL = "jeffery.dickerson@protonmail.com";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Research", to: "/research" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Blog", to: "/blog" },
];

const connectLinks = [
  { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jefferydickerson" },
  { label: "GitHub", href: "https://github.com/jeff-dickerson" },
];

export const Footer = () => {
  return (
    <footer className="py-12 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Jeff Dickerson</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI architect, systems builder, researcher.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Connect</h4>
            <ul className="space-y-2">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Jeff Dickerson. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
