import { useState } from 'react';
import BundleProduct from './BundleProduct';
import Quantity from '../../components/product/Quantity';
import AddToCartBtn from './AddToCartBtn';

const BundleProductPage = ({ products }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className='container py-4'>
      <div className='border-bottom pb-4'>
        <div className='row'>
          <div className='col-12'>
            <h3>{products.name}</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-sm-6'>
            <img
              src={products.image_groups[0].images[0].link}
              alt={products.image_groups[0].images[0].alt}
              loading='lazy'
              className='img-fluid'
            />
          </div>
          <div className='col-12 col-sm-6'>
            <p className='border-top border-bottom p-2'>
              Item No.{' '}
              <span>
                {products.id}
              </span>
            </p>
            <p></p>
          </div>
        </div>
      </div>
      {products.bundled_products.map((product, key) => {
        return <BundleProduct product={product} key={key} />;
      })}
      <div className='my-3 col-12 col-sm-6 offset-sm-6 d-flex flex-column align-items-center justify-content-center'>
        <Quantity quantity={quantity} setQuantity={setQuantity} />
        <p className='px-2'>
          Availability:{' '}
          <span>
            {products.inventory.orderable ? 'In stock' : 'Out of stock'}
          </span>
        </p>
        <AddToCartBtn
          productId={products.id}
          quantity={quantity}
          isOrderable={products.inventory.orderable}
        />
      </div>
    </div>
  );
};

export default BundleProductPage;
