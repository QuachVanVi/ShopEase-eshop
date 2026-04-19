import { Link } from 'react-router-dom';
import { ShoppingCart, Search, PieChart, Heart } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-gray-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <PieChart className="w-8 h-8 text-[#a46522] fill-[#a46522]" />
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            ShopEase
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-gray-900 transition-colors">New Arrivals</Link>
          <Link to="/" className="hover:text-gray-900 transition-colors">Designers</Link>
          <Link to="/" className="hover:text-gray-900 transition-colors">Journal</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[400px] mx-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search curated collections..." 
            className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-100 focus:outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <Heart className="w-5 h-5 fill-current" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-[#e68421] text-white text-[10px] font-bold rounded-full border-2 border-surface">
              0
            </span>
          </button>
          
          <Link to="/login" className="ml-2 bg-[#e68421] hover:bg-[#d4781c] text-white px-5 py-2 rounded text-sm font-semibold transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
