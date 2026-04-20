import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Star, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const currentCategory = searchParams.get('category');

  useEffect(() => {
    fetch('http://localhost:8080/api/products?t=' + new Date().getTime())
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  // Filter products based on URL parameter
  let displayProducts = products;
  if (currentCategory && currentCategory !== 'Home') {
    displayProducts = products.filter(p => p.category === currentCategory);
  }

  return (
    <div className="px-8 py-8 w-full max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {currentCategory && currentCategory !== 'Home' ? currentCategory : "All Categories"}
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Showing products</p>
        </div>
        
        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-sm font-bold text-gray-800">Sort By:</span>
          <button className="flex items-center justify-between gap-6 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300 transition-colors">
            Newest Arrivals
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => {
          
          // Synthetic labels based on index for variety
          let label = "";
          let labelColor = "";
          if (index === 0) { label = "BEST SELLER"; labelColor = "bg-gray-100 text-gray-700 border-gray-200"; }
          else if (index === 2) { label = "LIMITED TIME DEAL"; labelColor = "bg-orange-500 text-white border-transparent"; }

          return (
            <Link to={`/product/${product.id}`} key={`${product.id}-${index}`} className="group bg-white rounded-xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col p-4 block h-full">
              
              {/* Product Image Area */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-50/50 mb-4 flex items-center justify-center">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Wishlist Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const success = toggleWishlist(product.id);
                    if (!success) navigate('/login');
                  }}
                  className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm z-20 hover:scale-110 transition-transform active:scale-95 group/heart"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      isInWishlist(product.id) 
                        ? "fill-red-500 text-red-500" 
                        : "text-gray-400 group-hover/heart:text-red-400"
                    }`} 
                  />
                </button>

                {/* Sale / Best Seller Label */}
                {label && (
                  <div className={`absolute top-2 left-2 px-2.5 py-1 text-[10px] font-extrabold tracking-wide uppercase rounded-full border ${labelColor} shadow-sm z-10`}>
                    {label}
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="flex flex-col flex-1">
                <h3 className="text-base font-bold text-gray-900 leading-tight mb-1.5 group-hover:text-[#a46522] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                  <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                  <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                  <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                  <Star className="w-3.5 h-3.5 fill-gray-200 text-gray-200" />
                  <span className="text-xs text-gray-500 font-medium ml-1">({(Math.random() * 4000 + 100).toFixed(0)})</span>
                </div>
                
                <div className="mt-auto pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
                    <span className="text-xs text-gray-400 line-through font-medium">${(product.price * 1.15).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00a8e1] fill-[#00a8e1]/10" />
                    <span className="text-[11px] font-extrabold text-[#00a8e1] tracking-wide">PRIME</span>
                    <span className="text-[10px] font-medium text-gray-500">Free Delivery Tomorrow</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-16 pb-8">
        <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-400 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded bg-[#8a5100] text-white font-bold text-sm">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors">
          3
        </button>
        <span className="text-gray-400 mx-1">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors">
          24
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
