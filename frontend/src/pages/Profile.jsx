import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { User, Mail, MapPin, Phone, Globe, Save, Loader2, Heart, CreditCard, Moon, Sun, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const activeTab = searchParams.get('tab') || 'shop';
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    phoneNumber: '',
    country: ''
  });

  const [cardData, setCardData] = useState({
    cardNumber: '**** **** **** 4242',
    expiry: '12/26',
    cvv: '***',
    nameOnCard: user?.toUpperCase()
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch User
        const userRes = await fetch(`http://localhost:8080/api/users/${user}`);
        if (userRes.ok) {
          const data = await userRes.json();
          setFormData({
            username: data.username || '',
            email: data.email || '',
            address: data.address || '',
            phoneNumber: data.phoneNumber || '',
            country: data.country || ''
          });
        }

        // Fetch Products (for wishlist)
        const prodRes = await fetch('http://localhost:8080/api/products');
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData);
        }
      } catch (err) {
        setMessage('Network error. Could not load account data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');
    
    try {
      const response = await fetch(`http://localhost:8080/api/users/${user}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (err) {
      setMessage('Network error. Could not update profile.');
    } finally {
      setUpdating(false);
    }
  };

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const handleRemoveCard = async () => {
    if (!window.confirm('Are you sure you want to remove this payment method?')) return;
    
    setUpdating(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/${user}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber: null,
          cardExpiry: null,
          cardHolderName: null
        })
      });

      if (response.ok) {
        setCardData({ cardNumber: null, expiry: null, cvv: null, nameOnCard: null });
        setMessage('Payment method removed successfully.');
      }
    } catch (err) {
      setMessage('Failed to remove card.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white dark:bg-[#121212] rounded-3xl shadow-ambient border border-gray-100 dark:border-white/5 overflow-hidden transition-colors duration-300">
        
        {/* Profile Header */}
        <div className="bg-[#1c2223] h-40 relative">
          <div className="absolute -bottom-16 left-10 w-32 h-32 bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-xl border-4 border-white dark:border-[#1a1a1a] flex items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl italic capitalize">
                {user?.charAt(0)}
             </div>
          </div>
        </div>
        
        <div className="pt-20 px-10 pb-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{user}</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {activeTab === 'shop' && 'Managing your individual style profile'}
                {activeTab === 'saved' && `You have ${wishlist.length} items curated in your wishlist`}
                {activeTab === 'billing' && 'Securely manage your payment methods'}
                {activeTab === 'theme' && 'Customize your visual experience'}
              </p>
            </div>
            <button 
                onClick={logout}
                className="px-6 py-2.5 border border-red-200 dark:border-red-900/30 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-all font-bold text-sm tracking-wide"
              >
                Sign Out
            </button>
          </div>

          <hr className="mb-10 border-gray-100 dark:border-white/5" />

          {message && (
            <div className={`mb-8 p-4 rounded-xl text-sm font-bold border animate-in fade-in slide-in-from-top-2 ${message.includes('success') ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/30' : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/30'}`}>
              {message}
            </div>
          )}

          {/* Tab: SHOP SETTINGS */}
          {activeTab === 'shop' && (
            <form onSubmit={handleUpdateProfile} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Identity Details</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Username</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        value={formData.username}
                        disabled
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl text-gray-400 dark:text-gray-600 cursor-not-allowed font-bold text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Connection</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                      </div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-sm shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Logistics & Location</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Dispatch Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Contact Phone</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input 
                          type="tel" 
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-sm shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Region</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Globe className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input 
                          type="text" 
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-sm shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-white/5 space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Security & Billing</h3>
                <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-black rounded-xl flex items-center justify-center shadow-sm">
                      <CreditCard className={`w-6 h-6 ${cardData.cardNumber ? 'text-primary' : 'text-gray-300'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {cardData.cardNumber ? `Linked Card: ${cardData.cardNumber}` : 'No Payment Method Linked'}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                        {cardData.cardNumber ? 'Verified & Encrypted' : 'Add a card for faster checkout'}
                      </p>
                    </div>
                  </div>
                  {cardData.cardNumber && (
                    <button 
                      type="button"
                      onClick={handleRemoveCard}
                      className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline"
                    >
                      Remove Card
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={updating}
                  className="w-full md:w-auto px-12 py-4 bg-[#1c2223] dark:bg-white dark:text-black text-white rounded-xl text-sm font-black tracking-widest hover:bg-black dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98] shadow-2xl shadow-black/20 dark:shadow-white/5"
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SYNCHRONIZING...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>SAVE PROFILE ARCHIVE</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Tab: SAVED PRODUCTS */}
          {activeTab === 'saved' && (
            <div className="space-y-8">
               {savedProducts.length === 0 ? (
                 <div className="py-20 text-center bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
                    <Heart className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Longing for something?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">Your curation is currently empty. Explore our collections to find pieces that speak to you.</p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-[#1c2223] dark:bg-white dark:text-black text-white px-8 py-3 rounded-xl text-xs font-black tracking-widest hover:bg-black transition-all">
                       <ShoppingBag className="w-4 h-4" />
                       GO SHOPPING
                    </Link>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedProducts.map(product => (
                      <div key={product.id} className="group relative bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/5 p-4 transition-all hover:shadow-xl">
                        <Link to={`/product/${product.id}`} className="block aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-white/5 mb-4">
                           <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500 mix-blend-multiply dark:mix-blend-normal" />
                        </Link>
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-6 right-6 p-2 bg-white dark:bg-black/50 backdrop-blur-md rounded-full shadow-lg z-10 text-red-500"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                        <h4 className="font-bold text-gray-900 dark:text-white truncate">{product.name}</h4>
                        <p className="text-xs text-gray-500 mb-3">{product.brand}</p>
                        <p className="text-lg font-black text-gray-900 dark:text-white">${product.price}</p>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          )}

          {/* Tab: BILLING */}
          {activeTab === 'billing' && (
            <div className="max-w-2xl">
               {cardData.cardNumber ? (
                 <>
                   <div className="bg-gradient-to-br from-[#1c2223] to-[#3a4446] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden mb-8">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                      <div className="flex justify-between items-start mb-12">
                         <CreditCard className="w-10 h-10 opacity-80" />
                         <div className="flex gap-2">
                           <ShieldCheck className="w-6 h-6 text-green-400" />
                         </div>
                      </div>
                      <p className="text-2xl font-mono tracking-[0.2em] mb-8">{cardData.cardNumber}</p>
                      <div className="flex justify-between items-end">
                         <div>
                            <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Card Holder</p>
                            <p className="font-bold tracking-wide">{cardData.nameOnCard}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Expires</p>
                            <p className="font-bold tracking-wide">{cardData.expiry}</p>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center justify-between mb-12 ml-2">
                     <p className="text-xs text-gray-400 font-medium">Auto-debit is active for this card.</p>
                     <button 
                        onClick={handleRemoveCard}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30 transition-all"
                     >
                        Delete Payment Method
                     </button>
                   </div>
                 </>
               ) : (
                 <div className="py-16 text-center bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 mb-12">
                    <CreditCard className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-8">No payment method added</h3>
                 </div>
               )}

               <div className="space-y-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Secure Payment Methods</h3>
                  <div className="p-6 border-2 border-gray-100 dark:border-white/5 rounded-2xl flex items-center justify-between group hover:border-[#1c2223] dark:hover:border-white transition-colors cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center">
                           <CreditCard className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                           <p className="font-bold text-gray-900 dark:text-white text-sm">Add New Payment Method</p>
                           <p className="text-xs text-gray-500">Universal card support</p>
                        </div>
                     </div>
                     <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center font-bold text-lg group-hover:bg-[#1c2223] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">+</div>
                  </div>
               </div>
            </div>
          )}

          {/* Tab: THEME */}
          {activeTab === 'theme' && (
            <div className="max-w-xl">
               <div className="grid grid-cols-2 gap-6">
                  <button 
                    onClick={() => !isDarkMode && null}
                    className={`p-10 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all ${!isDarkMode ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]' : 'border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20'}`}
                    onClick={() => isDarkMode && toggleDarkMode()}
                  >
                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${!isDarkMode ? 'bg-white text-primary' : 'bg-gray-100 text-gray-400'}`}>
                        <Sun className="w-8 h-8" strokeWidth={2.5}/>
                     </div>
                     <div className="text-center">
                        <p className="font-black text-gray-900 dark:text-white tracking-widest text-xs uppercase mb-1">Light Aesthetic</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Clarity & Definition</p>
                     </div>
                  </button>

                  <button 
                    onClick={() => isDarkMode && null}
                    className={`p-10 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all ${isDarkMode ? 'border-white bg-white/5 shadow-2xl scale-[1.02]' : 'border-gray-100 hover:border-gray-300'}`}
                    onClick={() => !isDarkMode && toggleDarkMode()}
                  >
                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <Moon className="w-8 h-8" strokeWidth={2.5}/>
                     </div>
                     <div className="text-center">
                        <p className="font-black text-gray-900 dark:text-white tracking-widest text-xs uppercase mb-1">Cinematic Dark</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Focus & Atmosphere</p>
                     </div>
                  </button>
               </div>
               
               <div className="mt-12 p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">Visual Comfort</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                     The cinematic dark mode is designed to reduce eye strain during evening browsing sessions while highlighting the premium materials of our curated collection.
                  </p>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

