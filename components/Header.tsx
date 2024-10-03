import { useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  // Set the class on the html element to enforce dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <header className="bg-gray-1000 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold"><Link href="/">Hellavor</Link></h1>
        <ul className="flex space-x-4 me-8">
          <li className="hover:underline"><Link href="/">Home</Link></li>
          <li className="hover:underline"><Link href="/about">About</Link></li>
          <li className="hover:underline"><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
