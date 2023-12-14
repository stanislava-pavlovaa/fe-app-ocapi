import { AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

const ShoppingBag = () => {
  const { totalQuantity } = useCartContext();

  return (
    <NavLink className='header__bag' to='/cart'>
      <AiOutlineShoppingCart size={30} />

      <span className='header__bag-count'>{totalQuantity}</span>
    </NavLink>
  );
};

export default ShoppingBag;
