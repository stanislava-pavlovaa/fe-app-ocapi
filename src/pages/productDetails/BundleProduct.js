const BundleProduct = ({ product: { product } }) => {
  console.log('b product', product);
  return (
    <div className='py-4 border-bottom'>
      <div className='row'>
        <div className='col-12 col-sm-6'>
          <img
            src={product.image_groups[0].images[0].link}
            alt={product.image_groups[0].images[0].alt}
            loading='lazy'
            className='img-fluid'
          />
        </div>
        <div className='col-12 col-sm-6'>
          <h4>{product.name}</h4>
          <p className='border-top border-bottom p-2'>
            Item No.{' '}
            <span className='italic' style={{ fontStyle: 'italic' }}>
              {product.id}
            </span>
          </p>
          <p className='px-2'>
            Availability:{' '}
            <span>
              {product.inventory.orderable ? 'In stock' : 'Out of stock'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BundleProduct;
