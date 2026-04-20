import { Home, Monitor, Shirt, Leaf, Sparkles, Star, Settings, Moon, CreditCard, Heart } from 'lucide-react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const currentCategory = searchParams.get('category');
  const currentTab = searchParams.get('tab') || 'shop';

  const isProfileMode = location.pathname === '/profile';

  const isActive = (name) => {
    if (isProfileMode) return currentTab === name;
    if (name === 'Home' && !currentCategory) return true;
    return currentCategory === name;
  };

  const categories = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Electronics', icon: Monitor, path: '/?category=Electronics' },
    { name: 'Apparel', icon: Shirt, path: '/?category=Fashion' },
    { name: 'Home & Garden', icon: Leaf, path: `/?category=${encodeURIComponent('Home & Garden')}` },
    { name: 'Wellness', icon: Sparkles, path: '/?category=Wellness' },
    { name: 'Curated', icon: Star, path: '/?category=Curated' }
  ];

  const settingsItems = [
    { name: 'shop', label: 'Shop Settings', icon: Settings, path: '/profile?tab=shop' },
    { name: 'billing', label: 'Personal Card Details', icon: CreditCard, path: '/profile?tab=billing' },
    { name: 'saved', label: 'Saved Products', icon: Heart, path: '/profile?tab=saved' }
  ];

  const items = isProfileMode ? settingsItems : categories;
  const headerTitle = isProfileMode ? "Account Settings" : "Collections";
  const headerSubtitle = isProfileMode ? "Personalize Experience" : "The Editorial Selection";

  return (
    <aside className="w-[280px] shrink-0 pt-10 pb-8 pr-12 hidden lg:block bg-surface sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="mb-12">
        <h2 className="text-[15px] font-extrabold text-gray-900 mb-1">{headerTitle}</h2>
        <p className="text-[10px] font-extrabold text-gray-400 tracking-[0.2em] mb-6 uppercase">{headerSubtitle}</p>
        
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-4 px-3 py-2.5 rounded-md text-sm font-semibold transition-all ${
                  isActive(item.name) 
                    ? "text-[#e68421] bg-orange-50/50" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive(item.name) ? "text-[#e68421]" : "text-gray-400"}`} strokeWidth={2.5} />
                {item.label || item.name}
              </Link>
            </li>
          ))}
        </ul>

        {!isProfileMode && (
          <button className="mt-6 ml-3 text-[11px] font-extrabold text-[#e68421] tracking-wide hover:text-[#d4781c] transition-colors">
            View All Categories
          </button>
        )}
      </div>

    </aside>
  );
}
