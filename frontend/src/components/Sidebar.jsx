import { Home, Monitor, Shirt, Leaf, Sparkles, Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Sidebar() {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  // If no category is selected, 'Home' is the active one in the navigation context
  const isActive = (categoryName) => {
    if (categoryName === 'Home' && !currentCategory) return true;
    return currentCategory === categoryName;
  };

  const categories = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Electronics', icon: Monitor, path: '/?category=Electronics' },
    { name: 'Apparel', icon: Shirt, path: '/?category=Fashion' },
    { name: 'Home & Garden', icon: Leaf, path: `/?category=${encodeURIComponent('Home & Garden')}` },
    { name: 'Wellness', icon: Sparkles, path: '/?category=Wellness' },
    { name: 'Curated', icon: Star, path: '/?category=Curated' }
  ];

  return (
    <aside className="w-[280px] shrink-0 pt-10 pb-8 pr-12 hidden lg:block bg-surface sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="mb-12">
        <h2 className="text-[15px] font-extrabold text-gray-900 mb-1">Collections</h2>
        <p className="text-[10px] font-extrabold text-gray-400 tracking-[0.2em] mb-6 uppercase">The Editorial Selection</p>
        
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link 
                to={cat.path} 
                className={`flex items-center gap-4 px-3 py-2.5 rounded-md text-sm font-semibold transition-all ${
                  isActive(cat.name) 
                    ? "text-[#e68421] bg-orange-50/50" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <cat.icon className={`w-4 h-4 ${isActive(cat.name) ? "text-[#e68421]" : "text-gray-400"}`} strokeWidth={2.5} />
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>

        <button className="mt-6 ml-3 text-[11px] font-extrabold text-[#e68421] tracking-wide hover:text-[#d4781c] transition-colors">
          View All Categories
        </button>
      </div>

    </aside>
  );
}
