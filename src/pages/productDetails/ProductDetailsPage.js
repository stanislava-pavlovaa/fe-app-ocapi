import { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './ProductDetailsPage.css';

const PDP = () => {
  const [basketItems, setBasketItems] = useState([
    { id: 1, name: 'Item 1', quantity: 2 },
    { id: 2, name: 'Item 2', quantity: 1 },
  ]);
  return (
    <div>
      <Header basketItems={basketItems} />
      <main className="pdp-main">PDP</main>
      <Footer />
    </div>
  );
};

export default PDP;
