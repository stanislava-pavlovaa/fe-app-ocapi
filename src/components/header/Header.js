import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Header.css';
import ShoppingBag from './ShoppingBag';

const Header = () => {

  return (
    <div className='header'>
      <Link to='' className='header__logo'>
        <img src={logo} alt='Logo' />
      </Link>
      <ShoppingBag />
    </div>
  );
};

export default Header;
