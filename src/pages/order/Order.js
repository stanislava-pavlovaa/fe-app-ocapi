import { useCartContext } from '../../context/CartContext';

const Order = () => {
  const { order } = useCartContext();
  return <p>Order No {order.order_no}</p>;
};
export default Order;
