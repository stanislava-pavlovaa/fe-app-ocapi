import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import Button from 'react-bootstrap/Button';
import ProductTile from './ProductTile';

const Cart = () => {
  const { cart } = useCartContext();
  let navigate = useNavigate();
  console.log('cart cart', cart)

  if (cart && cart.product_items) {
    return (
      <>
        <h3>Shopping Cart</h3>
        <div className="my-3">{cart.product_items.map(item =><ProductTile item={item} key={item.item_id}></ProductTile>)}</div>
        <Button variant="danger">Checkout</Button>
      </>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center"> 
      <p>Your cart is empty!</p>
      <Button onClick={() => navigate(-1)} variant="danger">Back</Button> 
    </div>
  );
};

export default Cart;
