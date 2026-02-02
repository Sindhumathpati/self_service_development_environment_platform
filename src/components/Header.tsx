import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { member, isAuthenticated, isLoading, actions } = useMember();

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/features', label: 'FEATURES' },
    { href: '/dashboard', label: 'DASHBOARD' },
    { href: '/documentation', label: 'DOCUMENTATION' },
    { href: '/contact', label: 'CONTACT' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-primary border-b border-gridline sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-8 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl text-primary-foreground uppercase tracking-wider">
            DEVENV
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-paragraph text-sm text-primary-foreground uppercase tracking-wider hover:text-primary-foreground/80 transition-colors ${
                  isActive(link.href) ? 'border-b-2 border-primary-foreground pb-1' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoading ? (
              <div className="w-20 h-10 bg-secondary/20 animate-pulse" />
            ) : isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="font-paragraph text-sm text-primary-foreground uppercase tracking-wider hover:text-primary-foreground/80 transition-colors"
                >
                  {member?.profile?.nickname || 'PROFILE'}
                </Link>
                <Button
                  onClick={actions.logout}
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  SIGN OUT
                </Button>
              </>
            ) : (
              <Button
                onClick={actions.login}
                size="sm"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                SIGN IN
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-4 border-t border-gridline pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-paragraph text-sm text-primary-foreground uppercase tracking-wider hover:text-primary-foreground/80 transition-colors ${
                  isActive(link.href) ? 'border-l-2 border-primary-foreground pl-2' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gridline pt-4 mt-2">
              {isLoading ? (
                <div className="w-full h-10 bg-secondary/20 animate-pulse" />
              ) : isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-paragraph text-sm text-primary-foreground uppercase tracking-wider mb-3"
                  >
                    {member?.profile?.nickname || 'PROFILE'}
                  </Link>
                  <Button
                    onClick={() => {
                      actions.logout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    SIGN OUT
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    actions.login();
                    setMobileMenuOpen(false);
                  }}
                  size="sm"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  SIGN IN
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
