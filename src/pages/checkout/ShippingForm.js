import { useEffect, useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import {
  addShippingAddress,
  addShippingMethod,
  getShippingMethods,
} from '../../service/shopService';
import { createAddressBody } from '../../utils/Forms';

const ShippingForm = ({setIsShippingFormReady}) => {
  const { cart, setCart } = useCartContext();
  const shippingMethodId = cart?.shipments[0].shipment_id;
  const basketId = cart?.basket_id;
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState('');
  const [shippingInfo, setShippingInfo] = useState({});

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const methods = await getShippingMethods(basketId, shippingMethodId);
        setShippingMethods(methods.applicable_shipping_methods);
      } catch (error) {
        console.error('Error fetching shipping methods:', error);
      }
    };

    fetchShippingMethods();
  }, [basketId, shippingMethodId]);

  const handleShippingMethodChange = (event) => {
    const selectedId = event.target.value;
    setSelectedMethodId(selectedId);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo((prevShippingInfo) => ({
      ...prevShippingInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const shippingMethod = await addShippingMethod(basketId, selectedMethodId);
    const formData = createAddressBody(shippingInfo);
    console.log(formData);
    // const newAddress = await addShippingAddress(basketId, formData);
  };

  return (
    <div className='d-flex align-items-center flex-column'>
      <h3 className='mt-4'>Shipping</h3>
      <form onSubmit={handleSubmit} className='mb-5'>
        <label htmlFor='firstName' className='form-label'></label>
        <input
          type='text'
          name='firstName'
          value={shippingInfo.firstName}
          placeholder='First name'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='lastName' className='form-label'></label>
        <input
          type='text'
          name='lastName'
          value={shippingInfo.lastName}
          placeholder='Last name'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='phone' className='form-label'></label>
        <input
          type='tel'
          name='phone'
          value={shippingInfo.phone}
          placeholder='Phone number'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='address1' className='form-label'></label>
        <input
          type='text'
          name='address1'
          value={shippingInfo.address1}
          placeholder='Address'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='city' className='form-label'></label>
        <input
          type='text'
          name='city'
          value={shippingInfo.city}
          placeholder='City'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='countryCode' className='form-label'></label>
        <input
          type='text'
          name='countryCode'
          value={shippingInfo.countryCode}
          placeholder='Country code'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <label htmlFor='postalCode' className='form-label'></label>
        <input
          type='text'
          name='postalCode'
          value={shippingInfo.postalCode}
          placeholder='Postal code'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <h3 className='my-4'>Shipping Method</h3>
        {shippingMethods ? (
          shippingMethods.map((method) => (
            <div key={method.id}>
              <input
                type='radio'
                id={method.id}
                name='shippingMethod'
                value={method.id}
                onChange={handleShippingMethodChange}
              />
              <label htmlFor={method.id} className='mx-2'>
                {`${method.name} - ${
                  method.description
                } ($${method.price.toFixed(2)})`}
              </label>
            </div>
          ))
        ) : (
          <p>No shipping methods available!</p>
        )}

        <button type='submit' class="btn btn-danger">Next: Payment</button>
      </form>
    </div>
  );
};

export default ShippingForm;
