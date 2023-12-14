import { useState } from 'react';
import ShippingForm from './ShippingForm';

const Checkout = () => {
  const [isShippingFormReady, setIsShippingFormReady] = useState(false);

  if (!isShippingFormReady) {
    return (
      <ShippingForm setIsShippingFormReady={setIsShippingFormReady}></ShippingForm>
    );
  } else {
    return <p>dada</p>
  }
};

export default Checkout;
