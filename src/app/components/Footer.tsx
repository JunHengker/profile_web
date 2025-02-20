const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Sensorice</h3>
            <p className="text-sm">Smart IoT solutions for paddy fields</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/demo" className="hover:text-green-300">
                  Demo
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-green-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-green-300">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-green-300">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-sm mb-2">Email: alvinyoh08@gmail.com</p>
            {/* <p className="text-sm mb-2">Phone: </p> */}
            <p className="text-sm">
              Address: Tangerang Kota, Banten, Indonesia.
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-300">
                Facebook (soon)
              </a>

              <a href="#" className="hover:text-green-300">
                Twitter (soon)
              </a>
              <a
                href="https://linked.in/in/alvinyohanes"
                className="hover:text-green-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center">
          <p className="text-sm">&copy; 2025 SensoRice. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
