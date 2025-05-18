import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/utility/ScrollToTop';
import FloatingButtons from './components/utility/FloatingButtons';
import logo from './assets/logo.png';

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="fixed top-4 left-4 z-50">
        
      </div>
      <Routes>
        {/* Pages avec le layout (navbar) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* ✅ Page Admin sans layout */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <FloatingButtons />
    </>
  );
}

export default App;
