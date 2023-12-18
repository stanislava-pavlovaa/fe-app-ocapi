import { useEffect, useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import {
  addPaymentInstrument,
  createOrder,
  getPaymentMethods,
} from '../../service/shopService';
import { createPaymentBody } from '../../utils/Forms';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const { cart, setCart, setOrder } = useCartContext();
  const basketId = cart?.basket_id;
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [showCreditCardFields, setShowCreditCardFields] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await getPaymentMethods(basketId);
        setPaymentMethods(methods.applicable_payment_methods);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, [cart, basketId]);

  const handlePaymentMethodChange = (event) => {
    setSelectedCardId(event.target.value);
    setShowCreditCardFields(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo((prevPaymentInfo) => ({
      ...prevPaymentInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = createPaymentBody(cart.order_total, paymentInfo, selectedCardId);
      const paymentInstrument = await addPaymentInstrument(basketId, formData);
      const order = await createOrder(basketId);
      setCart(paymentInstrument);
      setOrder(order);
    } catch (error) {
      console.error('Error updating cart:', error);
    }

    navigate('/order')
  };

  return (
    <div className='container'>
      <h3 className='my-4 text-center'>Payment Methods</h3>
      {paymentMethods && paymentMethods[0] && paymentMethods[0].cards ? (
        paymentMethods[0].cards.map((method) => (
          <div key={method.card_type} className='d-block'>
            <input
              type='radio'
              id={method.card_type}
              name='cardType'
              value={method.card_type}
              required
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor={method.card_type} className='mx-2'>
              {method.name}
            </label>
          </div>
        ))
      ) : (
        <p>No payment methods available!</p>
      )}

      {showCreditCardFields && (
        <form onSubmit={handleSubmit} className='mb-5 d-flex flex-column'>
          <label htmlFor='cardNumber' className='form-label mt-3'>
            Card number
          </label>
          <input
            type='text'
            name='cardNumber'
            id='cardNumber'
            value={paymentInfo.cardNumber || ''}
            placeholder='4444333322221111'
            required
            className='form-control'
            onChange={handleInputChange}
          />

          <div className='row mt-3'>
            <div className='col-6'>
              <label htmlFor='expirationMonth' className='form-label'>
                Expiration month
              </label>
              <select
                name='expirationMonth'
                id='expirationMonth'
                required
                className='form-control'
                value={paymentInfo.expirationMonth || ''}
                onChange={handleInputChange}
              >
                <option value='' disabled>
                  Select Expiration Month
                </option>
                {Array.from({ length: 12 }, (_, index) => {
                  const month = index + 1;
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className='col-6'>
              <label htmlFor='expirationYear' className='form-label'>
                Expiration year
              </label>
              <select
                name='expirationYear'
                id='expirationYear'
                value={paymentInfo.expirationYear || ''}
                required
                className='form-control'
                onChange={handleInputChange}
              >
                <option value='' disabled>
                  Select Expiration Year
                </option>
                {Array.from({ length: 10 }, (_, index) => {
                  const year = new Date().getFullYear() + index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <label
                htmlFor='securityCode'
                className='form-label mt-3'
                title='Pleace, enter the security (CVV) code on the back of your card.'
              >
                Security Code*
              </label>
              <input
                type='text'
                name='securityCode'
                id='securityCode'
                value={paymentInfo.securityCode || ''}
                placeholder='123'
                required
                className='form-control'
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-danger mt-4'>
              Finish order
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
