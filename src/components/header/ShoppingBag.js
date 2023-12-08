import { AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink } from "react-router-dom";

const ShoppingBag = ({ itemCount }) => {
  return (
    <NavLink className="header__bag">
      <AiOutlineShoppingCart size={30} />
      {itemCount > 0 && <span className="header__bag-count">{itemCount}</span>}
    </NavLink>
  );
};

export default ShoppingBag;
