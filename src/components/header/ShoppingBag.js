import { AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

const ShoppingBag = () => {
  const { totalQuantity } = useCartContext();

  return (
    <NavLink className='d-flex align-items-center position-relative text-white' to='/cart'>
      <AiOutlineShoppingCart size={30} />
      <span className='header__bag-count badge bg-danger text-white position-absolute top-50 end-0'>{totalQuantity}</span>
    </NavLink>
  );
};

export default ShoppingBag;
