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
      <button
        className='btn btn-danger btn-sm'
        onClick={() => handleQuantity(-1)}
      >
        -
      </button>
      <span className='mx-2'>{quantity}</span>
      <button
        className='btn btn-danger btn-sm'
        onClick={() => handleQuantity(+1)}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
