import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Header.css';
import ShoppingBag from './ShoppingBag';

const Header = ({ basketItems }) => {
  const totalItems = basketItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='header'>
      <Link to='' className='header__logo'>
        <img src={logo} alt='Logo' />
      </Link>
      <ShoppingBag itemCount={totalItems} />
    </div>
  );
};

export default Header;
