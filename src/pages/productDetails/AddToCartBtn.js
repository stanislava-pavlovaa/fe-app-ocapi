import { useCartContext } from '../../context/CartContext';
import { createBasket, addProductToCart } from '../../service/shopService';
import Button from 'react-bootstrap/Button';

const AddToCartBtn = ({ productId, quantity, isOrderable }) => {
  const { cart, setCart } = useCartContext();

  let basketId = localStorage.getItem('basket');
  const basketExists = basketId !== null;

  const handleAddToCart = async () => {
    try {
      let basket;

      if (!basketExists) {
        basket = await createBasket();
        basketId = basket.basket_id;
        localStorage.setItem('basket', basketId);
      }

      const productData = [
        {
          product_id: productId,
          quantity: quantity,
        },
      ];

      const newItemToBasket = await addProductToCart(basketId, productData);
      setCart(newItemToBasket);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleAddToCart} variant="danger" disabled={!isOrderable}>
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCartBtn;
