import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter(); // Get the current route

  // Set the class on the html element to enforce dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <header className="bg-gray-1000 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Hellavor</Link>
        </h1>
        <ul className="flex space-x-4 me-8">
          <li className={`${router.pathname === '/' ? 'glass-effect text-bold' : ''} hover:glass-hover px-4 py-3 rounded-lg`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`${router.pathname === '/about' ? 'glass-effect text-bold' : ''} hover:glass-hover px-4 py-3 rounded-lg`}>
            <Link href="/about">About</Link>
          </li>
          <li className={`${router.pathname === '/explore' ? 'glass-effect text-bold' : ''} hover:glass-hover px-4 py-3 rounded-lg`}>
            <Link href="/explore">Explore</Link>
          </li>
          <li className={`${router.pathname === '/contact' ? 'glass-effect text-bold' : ''} hover:glass-hover px-4 py-3 rounded-lg`}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
