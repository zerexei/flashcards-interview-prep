import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { auth } from '@/utils/database';
import { signOut } from 'firebase/auth';
import ROUTES from '@/routes';

export const Header: React.FC = () => {
  const { isAuth, isAdmin, isFirebaseEnabled } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Standard nav links logic based on whether Firebase is enabled and user role
  const navLinks = [
    { name: ROUTES.flashcards.title, path: ROUTES.flashcards.path }
  ];

  if (isFirebaseEnabled) {
    if (isAuth) {
      if (isAdmin) {
        navLinks.push({ name: 'Admin', path: ROUTES.admin.flashcards.path });
      }
    } else {
      navLinks.push({ name: ROUTES.login.title, path: ROUTES.login.path });
    }
  }


  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border py-4'
          : 'bg-transparent border-transparent py-6',
      )}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link to={ROUTES.home.path} className="text-lg font-bold tracking-tighter text-foreground">
          AD<span className="text-primary">.</span> Flashcards
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-foreground',
                location.pathname === link.path ? 'text-primary' : 'text-neutral-foreground',
              )}
            >
              {link.name}
            </Link>
          ))}

          {isFirebaseEnabled && isAuth && (
            <button
              onClick={handleLogout}
              className="button button-sm button-ghost flex items-center gap-1.5"
            >
              <LogOut size={14} />
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-neutral-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border p-6 animate-fade-in">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-lg font-medium transition-colors',
                  location.pathname === link.path ? 'text-foreground' : 'text-neutral-foreground',
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isFirebaseEnabled && isAuth && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-left text-lg font-medium text-neutral-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
