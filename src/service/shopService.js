import { get, post } from './ocapiService';
import {
  getProductEndpoint,
  CREATE_BASKET_URL,
  getAddProductItemEndpoint,
  getRemoveProductItemEndpoint,
} from '../endpoints/shopApi';

export const getProduct = async (productId) => {
  const product = await get(getProductEndpoint(productId));
  return product;
};

export const createBasket = async () => {
  const basket = await post(CREATE_BASKET_URL);
  console.log('newbasket', basket);
  return basket;
};

export const addProductToCart = async (basketId, productData) => {
  const cart = await post(getAddProductItemEndpoint(basketId), productData);
  console.log('addtocart', cart);
  return cart;
};

export const removeProductFromCart = async (basketId, productId) => {
  const cart = await post(getRemoveProductItemEndpoint(basketId, productId));
  // console.log('removefromcart', cart);
  return cart;
};
