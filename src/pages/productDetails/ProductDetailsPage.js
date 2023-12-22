import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../service/shopService';
import Spinner from 'react-bootstrap/Spinner';
import Product from './Product';
import BundleProductPage from './BundleProductsPage';
import PageNotFound from '../notFound/pageNotFound';

const PDP = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(productId);
      setLoading(false);

      if (product.fault) {
        console.error(product.fault.message);
      } else {
        setProduct(product);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className='d-flex align-items-center justify-content-center vh-100'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!product) {
    return <PageNotFound />;
  }

  return (
    <>
      {product.type.bundle ? (
        <BundleProductPage products={product} />
      ) : (
        <Product product={product} />
      )}
    </>
  );
};

export default PDP;
