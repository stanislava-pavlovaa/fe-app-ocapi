import Button from 'react-bootstrap/Button';

const Quantity = ({ quantity, setQuantity }) => {
  const handleQuantity = (amount) => {
    const newQuantity = quantity + amount;

    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className='my-3'>
      <label className='mx-2'>Quantity:</label>
      <Button
        className='rounded-circle btn-sm'
        variant='danger'
        onClick={() => handleQuantity(-1)}
      >
        -
      </Button>
      <span className='mx-2'>{quantity}</span>
      <Button
        className='rounded-circle btn-sm'
        variant='danger'
        onClick={() => handleQuantity(+1)}
      >
        +
      </Button>
    </div>
  );
};

export default Quantity;
