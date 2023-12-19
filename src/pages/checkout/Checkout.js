import { useState } from 'react';
import ShippingForm from './ShippingForm';
import BillingForm from './BillingForm';
import PaymentForm from './PaymentForm';

const Checkout = () => {
  const [isShippingFormReady, setIsShippingFormReady] = useState(false);
  const [isBillingFormReady, setIsBillingFormReady] = useState(false);

  if (!isShippingFormReady && !isBillingFormReady) {
    return <ShippingForm setIsShippingFormReady={setIsShippingFormReady} />;
  } else if (isShippingFormReady && !isBillingFormReady) {
    return <BillingForm setIsBillingFormReady={setIsBillingFormReady} />;
  } else if (isShippingFormReady && isBillingFormReady) {
    return <PaymentForm />;
  } 
};

export default Checkout;
