import { useCartContext } from '../../context/CartContext';
import useContentAsset from '../../hooks/useContentAsset';
import Spinner from 'react-bootstrap/Spinner';

const Order = () => {
  const { order } = useCartContext();
  const { contentAsset } = useContentAsset('ocapi-order-submit-message');

  if (order && contentAsset) {
    const contentAssetBody = contentAsset.replace(/\${orderID}/, order.order_no);

    return (
      <div className='container text-center d-flex justify-content-center flex-column min-vh-100'>
        <p>{contentAssetBody}</p>
        <p>Total Price: {order.order_total}</p>
      </div>
    );
  }

  return (
    <div className='d-flex align-items-center justify-content-center vh-100'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
};
export default Order;
