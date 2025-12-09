import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold gradient-text">SeyCodes</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Master data structures and algorithms with hands-on practice and community support.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/learn/arrays" className="text-muted-foreground hover:text-primary transition-colors">
                  Arrays
                </Link>
              </li>
              <li>
                <Link to="/learn/linkedlists" className="text-muted-foreground hover:text-primary transition-colors">
                  Linked Lists
                </Link>
              </li>
              <li>
                <Link to="/learn/trees" className="text-muted-foreground hover:text-primary transition-colors">
                  Trees
                </Link>
              </li>
              <li>
                <Link to="/learn/graphs" className="text-muted-foreground hover:text-primary transition-colors">
                  Graphs
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/problems" className="text-muted-foreground hover:text-primary transition-colors">
                  Problems
                </Link>
              </li>
              <li>
                <Link to="/discussion" className="text-muted-foreground hover:text-primary transition-colors">
                  Discussion
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; 2024 SeyCodes. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
