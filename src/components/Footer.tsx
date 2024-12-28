export const Footer = () => {
  return (
    <footer className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">YourName</h3>
            <p className="text-sm text-gray-600">
              Product Engineer
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a></li>
              <li><a href="/case-studies" className="text-gray-600 hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="/content" className="text-gray-600 hover:text-primary transition-colors">Content</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Email</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} YourName. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};