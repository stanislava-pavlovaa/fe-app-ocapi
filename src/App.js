import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getJWTToken } from './service/ocapiService';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';

const ProductDetailsPage = lazy(() =>
  import('./pages/productDetails/ProductDetailsPage')
);
const PageNotFound = lazy(() => import('./pages/notFound/pageNotFound'));

const App = () => {
  getJWTToken();
  const [basketItems, setBasketItems] = useState([
    { id: 1, name: 'Item 1', quantity: 2 },
    { id: 2, name: 'Item 2', quantity: 1 },
  ]);
  return (
    <CartProvider>
      <BrowserRouter>
        <Header basketItems={basketItems} />
        <main className='page-main'>
          <Routes>
            {/* <Route index element={<ProductDetailsPage />} /> */}
            <Route path='/:productId' element={<ProductDetailsPage />} />
            <Route path='/page-not-found' element={<PageNotFound />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
