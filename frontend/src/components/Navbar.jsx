import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, PieChart } from 'lucide-react';

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

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Wireless Headphones" 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-200/70 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#a46522] focus:outline-none transition-all placeholder:text-gray-500"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>
          <Link to="/login" className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <User className="w-5 h-5 text-gray-700" />
          </Link>
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
