import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
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
    return <div className="min-h-screen flex items-center justify-center">Loading essentials...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">Curated Collection</h1>
        <p className="text-gray-500 max-w-xl text-lg text-balance">Discover our hand-picked selection of premium artifacts designed to elevate your everyday workflow.</p>
      </div>

      {/* Editorial Asymmetric Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {products.map((product, index) => {
          // Creating an asymmetric feel by varying column spans based on index
          const isLarge = index === 0 || index === 3;
          const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";
          
          return (
            <Link to={`/product/${product.id}`} key={product.id} className={`${colSpan} group cursor-pointer block`}>
              <div className="relative overflow-hidden bg-gray-100 rounded-3xl mb-6 aspect-[4/3] w-full">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.stock < 10 && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full shadow-sm text-primary">
                    Few Left
                  </div>
                )}
                <div className="absolute inset-0 bg-black/opacity-0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">{product.brand}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-gray-500 line-clamp-2 text-sm">{product.description}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
