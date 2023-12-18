import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getJWTToken } from './service/ocapiService';
import { CartProvider } from './context/CartContext';
import Spinner from 'react-bootstrap/Spinner';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Cart from './pages/cart/Cart';
import HomePage from './pages/home/Homepage';
import Checkout from './pages/checkout/Checkout';
import Order from './pages/order/Order';

const ProductDetailsPage = lazy(() =>
  import('./pages/productDetails/ProductDetailsPage')
);

const PageNotFound = lazy(() => import('./pages/notFound/pageNotFound'));

const App = () => {
  getJWTToken();
  return (
    <CartProvider>
      <BrowserRouter>
        <Suspense fallback={<Spinner animation='border' role='status'></Spinner>}>
          <Header />
          <main className='min-vh-100'>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/:productId' element={<ProductDetailsPage />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/order' element={<Order />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
