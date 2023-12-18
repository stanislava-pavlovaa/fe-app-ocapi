import { useEffect, useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { addShippingAddress, addShippingMethod,getShippingMethods } from '../../service/shopService';
import { createAddressBody } from '../../utils/Forms';

const ShippingForm = ({ setIsShippingFormReady }) => {
  const { cart, setCart } = useCartContext();
  const basketId = cart?.basket_id;
  const shipmentId = cart?.shipments[0].shipment_id;
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState('');
  const [shippingInfo, setShippingInfo] = useState({});

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const methods = await getShippingMethods(basketId, shipmentId);
        setShippingMethods(methods.applicable_shipping_methods);
      } catch (error) {
        console.error('Error fetching shipping methods:', error);
      }
    };

    fetchShippingMethods();
  }, [basketId, shipmentId]);

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

    try {
      const shippingMethod = await addShippingMethod(basketId, shipmentId, selectedMethodId);
      const formData = createAddressBody(shippingInfo);
      const shippingAddress = await addShippingAddress(basketId, shipmentId, formData);

      setCart((prevCart) => ({
        ...prevCart,
        ...shippingMethod,
        ...shippingAddress,
      }));

      setIsShippingFormReady(true);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className='container'>
      <h3 className='mt-4 text-center'>Shipping</h3>
      <form onSubmit={handleSubmit} className='mb-5 d-flex flex-column'>
        <label htmlFor='firstName' className='form-label'></label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          value={shippingInfo.firstName || ''}
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
          value={shippingInfo.lastName || ''}
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
          value={shippingInfo.phone || ''}
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
          value={shippingInfo.address1 || ''}
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
          value={shippingInfo.city || ''}
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
          value={shippingInfo.countryCode || ''}
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
          value={shippingInfo.postalCode || ''}
          placeholder='Postal code'
          required
          className='form-control'
          onChange={handleInputChange}
        ></input>

        <h3 className='my-4 text-center'>Shipping Method</h3>
        {shippingMethods ? (
          shippingMethods.map((method) => (
            <div key={method.id} className='d-block'>
              <input
                type='radio'
                id={method.id}
                name='shippingMethod'
                value={method.id}
                required
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

        <div className='text-center'>
          <button type='submit' className='btn btn-danger mt-4'>
            Next: Billing Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
