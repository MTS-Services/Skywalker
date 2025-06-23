const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 py-6 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </div>
          <div className="space-x-6">
            <a href="/" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-400">
              Terms & Conditions
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
