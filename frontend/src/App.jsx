import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductGrid from './pages/ProductGrid';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        
        <footer className="py-12 text-center text-gray-400 text-sm border-t border-gray-100 mt-20">
          <p>© 2026 The Curated Marketplace. Initial Architecture (Metod A).</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
