import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductGrid from './pages/ProductGrid';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface flex flex-col font-sans">
        <Navbar />
        
        <div className="flex flex-1 mx-auto w-full max-w-[1600px]">
          <Sidebar />
          
          <main className="flex-1 w-full relative">
            <Routes>
              <Route path="/" element={<ProductGrid />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
