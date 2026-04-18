import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-primary">
          CURATED.
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-primary transition-colors">Catalog</Link>
          <a href="#" className="hover:text-primary transition-colors">Editorial</a>
          <a href="#" className="hover:text-primary transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User className="w-5 h-5 text-gray-700" />
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
