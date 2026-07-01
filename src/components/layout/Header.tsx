import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../../utils/useAuth";
import { auth } from "../../utils/database";
import { signOut } from "firebase/auth";
import ROUTES from "@/routes";

export const Header: React.FC = () => {
  const { isAuth, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = isAuth
    ? [
        { name: ROUTES.flashcards.title, path: ROUTES.flashcards.path },
        ...(isAdmin
          ? [{ name: "Admin", path: ROUTES.admin.flashcards.path }]
          : []),
      ]
    : [{ name: ROUTES.login.title, path: ROUTES.login.path }];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-zinc-800 py-4"
          : "bg-transparent border-transparent py-6",
      )}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link to={ROUTES.home.path} className="text-lg font-bold tracking-tighter">
          AD<span className="text-accent">.</span> Flashcards
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                location.pathname === link.path
                  ? "text-accent"
                  : "text-zinc-400",
              )}
            >
              {link.name}
            </Link>
          ))}

          {isAuth && (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <LogOut size={14} />
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-6 animate-fade-in">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-lg font-medium",
                  location.pathname === link.path
                    ? "text-white"
                    : "text-zinc-400",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuth && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-left text-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
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
