const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 border-t">
      <div className="container max-w-4xl mx-auto text-center text-sm text-muted-foreground">
        <p>© {currentYear} Lindan AB. All rights reserved.</p>
        <p className="mt-2">
          Contact: <a href="mailto:hi@lindaninc.com" className="hover:text-foreground transition-colors">hi@lindaninc.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
