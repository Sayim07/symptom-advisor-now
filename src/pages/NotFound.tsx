import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="mb-6">
          <span className="text-6xl">🩺</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center rounded-md bg-gradient-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-button hover:shadow-lg transition-all"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
