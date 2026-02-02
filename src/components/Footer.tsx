import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary border-t border-gridline">
      <div className="max-w-[120rem] mx-auto px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl text-primary-foreground uppercase tracking-wider mb-4">
              DEVENV
            </h3>
            <p className="font-paragraph text-sm text-primary-foreground/80 leading-relaxed">
              Self-service development environment platform for modern teams
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-heading text-sm text-primary-foreground uppercase tracking-wider mb-4">
              PLATFORM
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-sm text-primary-foreground uppercase tracking-wider mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/documentation#getting-started" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link to="/documentation#api" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-sm text-primary-foreground uppercase tracking-wider mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gridline pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-paragraph text-sm text-primary-foreground/60">
            © {currentYear} DevEnv Platform. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="font-paragraph text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="font-paragraph text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
