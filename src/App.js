import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getJWTToken } from './service/ocapiService';
import { CartProvider } from './context/CartContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Cart from './pages/cart/Cart';
import HomePage from './pages/home/Homepage';

const ProductDetailsPage = lazy(() =>
  import('./pages/productDetails/ProductDetailsPage')
);
const PageNotFound = lazy(() => import('./pages/notFound/pageNotFound'));

const App = () => {
  getJWTToken();
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main className='page-main'>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='/:productId' element={<ProductDetailsPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/page-not-found' element={<PageNotFound />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
