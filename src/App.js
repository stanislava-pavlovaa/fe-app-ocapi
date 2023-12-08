import './App.css';

import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const ProductDetailsPage = lazy(() =>
  import('./pages/productDetails/ProductDetailsPage')
);
const PageNotFound = lazy(() => import('./pages/notFound/pageNotFound'));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ProductDetailsPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
