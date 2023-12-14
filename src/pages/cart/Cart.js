import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ProductTile from './ProductTile';

const Cart = () => {
  const { cart } = useCartContext();
  let navigate = useNavigate();

  if (cart && cart.product_items) {
    return (
      <div className='d-flex align-items-center flex-column text-center'>
        <h3 className='mt-3'>Shopping Cart</h3>
        <div className='my-3'>
          {cart.product_items.map((item) => (
            <ProductTile item={item} key={item.item_id}></ProductTile>
          ))}
        </div>
        <div className='row'>
          {/* <Button onClick={() => navigate(-1)} variant='danger'>Back</Button> */}
          <Link to="/checkout" className='btn btn-danger'>Checkout</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <p>Your cart is empty!</p>
      <Button onClick={() => navigate(-1)} variant='danger'>
        Back
      </Button>
    </div>
  );
};

export default Cart;
