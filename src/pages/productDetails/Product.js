import { useEffect, useState } from 'react';
import ImageCarousel from './Carousel';
import VariationAttributes from './VariationAttributes';
import Quantity from'./Quantity'
import AddToCartBtn from './AddToCartBtn';

const Product = ({ product }) => {
  const [variatonAttributes, setVariatonAttributes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(product.variants[0].product_id);
  
  useEffect(() => {
    setVariatonAttributes(product.variation_attributes);
  }, [product.variation_attributes])
  
  const handleVariationSelection = (name, value) => {
    if (name.toLowerCase() === 'size') {
      const selectedVariant = product.variants.find(
        (variant) => variant.variation_values[name] === value
      );

      if (selectedVariant) {
        setSelectedProductId(selectedVariant.product_id);
      }
    }
  };

  return (
    <div className='container my-5'>
        <div className="row">
            <section className='col-6'>
              <ImageCarousel images={product.image_groups[0].images}/>
            </section>
            <section className='col-6'>
                <h2>{product.name}</h2>
                <span className={product.inventory.orderable ? 'text-success': 'text-danger'}>{product.inventory.orderable ? 'In stock': 'Out of stock'}</span>
                <p>Product ID: {selectedProductId}</p>
                <h4 className='my-3'>{product.price} {product.currency}</h4>
                <p className='my-3'>{product.short_description}</p>
                <VariationAttributes variatonAttributes={variatonAttributes} onSelectionChange={handleVariationSelection}/>
                <Quantity quantity={quantity} setQuantity={setQuantity}/>
                <AddToCartBtn productId={selectedProductId} quantity={quantity} isOrderable={product.inventory.orderable} />
            </section>
        </div>
    </div>
  );
};

export default Product;
