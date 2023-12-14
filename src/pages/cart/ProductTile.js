import { Card, Button } from 'react-bootstrap';
import { useCartContext } from '../../context/CartContext';
import { removeProductFromCart } from '../../service/shopService';

const ProductTile = ({ item }) => {
  const { cart, setCart } = useCartContext();

  const handleRemoveItem = async (productId) => {
    const removeItemFromBasket = await removeProductFromCart(
      cart.basket_id,
      productId
    );
    setCart(removeItemFromBasket);
  };

  return (
    <Card className='my-2'>
      <Card.Body>
        <Card.Title>{item.product_name}</Card.Title>
        <Card.Text>Quantity: {item.quantity}</Card.Text>
        <Card.Subtitle className='mb-2 text-muted'>
          Total Price: {item.price} {cart.currency}
        </Card.Subtitle>
        <Card.Subtitle className='mb-2 text-muted'>
          Price after discount: {item.price_after_item_discount} {cart.currency}
        </Card.Subtitle>
        <Button variant='danger' onClick={() => handleRemoveItem(item.item_id)}>
          Remove
        </Button> 
      </Card.Body>
    </Card>
  );
};

export default ProductTile;
