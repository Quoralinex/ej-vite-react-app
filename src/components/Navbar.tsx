
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg w-10 h-10 flex items-center justify-center text-white font-bold text-xl">
              EJ
            </div>
            <span className="font-bold text-lg hidden sm:inline">Equitable Journeys</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/qualifications" className="font-medium hover:text-primary transition-colors">
              Qualifications
            </Link>
            <Link to="/pathways" className="font-medium hover:text-primary transition-colors">
              Career Pathways
            </Link>
            <Link to="/about" className="font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Button asChild>
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3 animate-fade-in">
            <Link
              to="/"
              className="block py-2 px-4 text-sm hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/qualifications"
              className="block py-2 px-4 text-sm hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              Qualifications
            </Link>
            <Link
              to="/pathways"
              className="block py-2 px-4 text-sm hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              Career Pathways
            </Link>
            <Link
              to="/about"
              className="block py-2 px-4 text-sm hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <div className="pt-2">
              <Button asChild className="w-full">
                <Link to="/contact" onClick={toggleMenu}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
