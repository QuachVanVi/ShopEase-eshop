import { Home, Monitor, Shirt, Leaf, Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Sidebar() {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const getSidebarClass = (categoryName) => {
    return currentCategory === categoryName || (!currentCategory && categoryName === 'Home')
      ? "flex items-center gap-3 px-4 py-2.5 bg-blue-100/50 text-blue-900 rounded-lg font-medium text-sm transition-colors"
      : "flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors";
  };

  const getIconClass = (categoryName) => {
    return currentCategory === categoryName || (!currentCategory && categoryName === 'Home')
      ? "w-5 h-5 text-blue-700"
      : "w-5 h-5 text-gray-500";
  };

  return (
    <aside className="w-64 shrink-0 px-6 py-8 border-r border-gray-100 hidden lg:block bg-surface mix-blend-multiply sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-900 tracking-wider mb-4 uppercase">Categories</h3>
        <ul className="space-y-1">
          <li>
            <Link to="/" className={getSidebarClass('Home')}>
              <Home className={getIconClass('Home')} /> Home
            </Link>
          </li>
          <li>
            <Link to="/?category=Electronics" className={getSidebarClass('Electronics')}>
              <Monitor className={getIconClass('Electronics')} /> Electronics
            </Link>
          </li>
          <li>
            <Link to="/?category=Fashion" className={getSidebarClass('Fashion')}>
              <Shirt className={getIconClass('Fashion')} /> Fashion
            </Link>
          </li>
          <li>
            <Link to={`/?category=${encodeURIComponent('Home & Garden')}`} className={getSidebarClass('Home & Garden')}>
              <Leaf className={getIconClass('Home & Garden')} /> Home & Garden
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-900 tracking-wider mb-4 uppercase">Filters</h3>
        
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">Price Range</h4>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 bg-gray-200/60 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition">Under $50</button>
            <button className="px-3 py-1.5 bg-gray-200 rounded-full text-xs font-medium text-gray-900 transition">$50 - $150</button>
            <button className="px-3 py-1.5 bg-gray-200/60 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition">Over $150</button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-3">Customer Rating</h4>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <Star className="w-4 h-4 fill-gray-200 text-gray-200" />
            <span className="text-xs font-bold text-gray-600 ml-1">& Up</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
