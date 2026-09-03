import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/button';

// There was previously no catch-all route — a typo'd URL rendered blank.
const NotFound = () => (
  <div className="min-h-screen bg-background">
    <Seo title="Page not found" description="The page you're looking for doesn't exist or has been moved." />
    <Navigation />
    <main className="container mx-auto px-6 pt-32 pb-20">
      <div className="mx-auto max-w-xl py-20 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-8">
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
