import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Product from './Product';
import BundleProduct from './BundleProduct';
import { getProduct } from '../../service/shopService';
import Spinner from 'react-bootstrap/Spinner';

const PDP = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(productId);

      if (product.fault) {
        console.error(product.fault.message);
      } else {
        setProduct(product);
        // console.log(product);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      {product.type.bundle ? (
        <BundleProduct product={product} />
      ) : (
        <Product product={product} />
      )}
    </>
  );
};

export default PDP;
