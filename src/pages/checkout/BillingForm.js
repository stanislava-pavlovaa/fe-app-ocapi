import { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { addBillingAddress } from '../../service/shopService';
import { createAddressBody } from '../../utils/Forms';

const BillingForm = ({ setIsBillingFormReady }) => {
  const { cart, setCart } = useCartContext();
  const basketId = cart?.basket_id;
  const [billingInfo, setBillingInfo] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBillingInfo((prevBillingInfo) => ({
      ...prevBillingInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = createAddressBody(billingInfo);
      const billingAddress = await addBillingAddress(basketId, formData);
      setCart(billingAddress);

      setIsBillingFormReady(true);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className='container'>
      <h3 className='mt-4 text-center'>Billing</h3>
      <form onSubmit={handleSubmit} className='mb-5 d-flex flex-column'>
        <label htmlFor='firstName' className='form-label'></label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          value={billingInfo.firstName || ''}
          placeholder='First name'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='lastName' className='form-label'></label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          value={billingInfo.lastName || ''}
          placeholder='Last name'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='phone' className='form-label'></label>
        <input
          type='tel'
          name='phone'
          id='phone'
          value={billingInfo.phone || ''}
          placeholder='Phone number'
          pattern='^\+?[1-9][0-9]{9,15}$'
          title='Please enter a valid phone number'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='address1' className='form-label'></label>
        <input
          type='text'
          name='address1'
          id='address1'
          value={billingInfo.address1 || ''}
          placeholder='Address'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='city' className='form-label'></label>
        <input
          type='text'
          name='city'
          id='city'
          value={billingInfo.city || ''}
          placeholder='City'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='countryCode' className='form-label'></label>
        <input
          type='text'
          name='countryCode'
          id='countryCode'
          value={billingInfo.countryCode || ''}
          placeholder='Country code'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='postalCode' className='form-label'></label>
        <input
          type='text'
          name='postalCode'
          id='postalCode'
          value={billingInfo.postalCode || ''}
          placeholder='Postal code'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <div className='text-center'>
          <button type='submit' className='btn btn-danger mt-4'>
            Next: Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
