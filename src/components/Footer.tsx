import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t">
      <div className="container max-w-4xl mx-auto text-center text-sm text-muted-foreground">
        <p>© {currentYear} Lindan AB. All rights reserved.</p>
        <p className="mt-2">
          Contact:{" "}
          <a href="mailto:fiftytwoormore@lindaninc.com" className="hover:text-foreground transition-colors">
            fiftytwoormore@lindaninc.com
          </a>
          {" · "}
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
