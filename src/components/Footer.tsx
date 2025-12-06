
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary to-accent rounded-lg w-10 h-10 flex items-center justify-center text-white font-bold text-xl">
                EJ
              </div>
              <span className="font-bold text-lg">Equitable Journeys</span>
            </div>
            <p className="text-gray-600 text-sm">
              Creating a better, more equitable world through education and career advancement.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/qualifications" className="text-gray-600 hover:text-primary text-sm">
                  Qualifications
                </Link>
              </li>
              <li>
                <Link to="/pathways" className="text-gray-600 hover:text-primary text-sm">
                  Career Pathways
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.gov.uk/what-different-qualification-levels-mean/list-of-qualification-levels" 
                  className="text-gray-600 hover:text-primary text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gov.UK Qualification Levels
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
          
                <a
                  href="https://www.linkedin.com/in/q1x/"
                  className="text-gray-600 hover:text-primary text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@equitable-journeys@quoralinex.com"
                  className="text-gray-600 hover:text-primary text-sm"
                >
                  Email Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Equitable Journeys. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-600 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-primary text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-600 hover:text-primary text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
