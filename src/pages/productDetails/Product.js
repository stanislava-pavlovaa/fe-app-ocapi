import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from '../../components/product/Carousel';
import VariationAttributes from '../../components/product/VariationAttributes';
import Quantity from '../../components/product/Quantity';
import AddToCartBtn from './AddToCartBtn';

const Product = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(product.variants[0].product_id);
  const [variatonAttributes, setVariatonAttributes] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState({});
  
  useEffect(() => {
    setVariatonAttributes(product.variation_attributes);
  }, [ product.variation_attributes])
  
  const handleVariationSelection = (name, value) => {
    setSelectedVariations((prevSelections) => ({
      ...prevSelections,
      [name]: value,
    }));
  };

  useEffect(() => {
    const selectedVariant = product.variants.find((variant) =>
      Object.entries(selectedVariations).every(
        ([key, val]) => variant.variation_values[key] === val
      )
    );

    if (selectedVariant) {
      setSelectedProductId(selectedVariant.product_id);
      navigate(`/${selectedVariant.product_id}`);
    }
    
  }, [selectedVariations, product.variants]);

  return (
    <div className='container my-5'>
        <div className="row">
            <section className='col-12 col-md-6'>
              <ImageCarousel images={product.image_groups[0].images}/>
            </section>
            <section className='col-12 col-md-6'>
                <h2>{product.name}</h2>
                <span className={product.inventory.orderable ? 'text-success': 'text-danger'}>{product.inventory.orderable ? 'In stock': 'Out of stock'}</span>
                <p>Product ID: {selectedProductId}</p>
                <h4 className='my-3'>{product.price} {product.currency}</h4>
                <p className='my-3'>{product.short_description}</p>
                <VariationAttributes variatonAttributes={variatonAttributes} onSelectionChange={handleVariationSelection}/>
                <Quantity quantity={quantity} setQuantity={setQuantity}/>
                <AddToCartBtn productId={selectedProductId} quantity={quantity} isOrderable={product.inventory.orderable} selectedVariations={selectedVariations} variationAttributes={variatonAttributes} />
            </section>
        </div>
    </div>
  );
};

export default Product;