import { get, post, put, deleteAction } from './ocapiService';
import {
  getProductEndpoint,
  CREATE_BASKET_URL,
  getAddProductItemEndpoint,
  getRemoveProductItemEndpoint,
  getAddShippingMethodsEndpoint,
  getShippingMethodsEndpoint,
  getAddShippingAddressEndpoint,
} from '../endpoints/shopApi';

export const getProduct = async (productId) => {
  const product = await get(getProductEndpoint(productId));
  return product;
};

export const createBasket = async () => {
  const basket = await post(CREATE_BASKET_URL);
  return basket;
};

export const addProductToCart = async (basketId, productData) => {
  const cart = await post(getAddProductItemEndpoint(basketId), productData);
  return cart;
};

export const removeProductFromCart = async (basketId, productId) => {
  const cart = await deleteAction(getRemoveProductItemEndpoint(basketId, productId));
  return cart;
};

export const addShippingMethod = async (basketId, shipmentId, selectedShippingMethodId) => {
  const cart = await put(getAddShippingMethodsEndpoint(basketId, shipmentId), { id: selectedShippingMethodId });
  return cart;
};

export const getShippingMethods = async (basketId, shippingMethodId) => {
  const shippingMethods = await get(getShippingMethodsEndpoint(basketId, shippingMethodId));
  return shippingMethods;
};

export const addShippingAddress = async (basketId, shipmentId, shippingData) => {
  const shippingAddress = await put(getAddShippingAddressEndpoint(basketId, shipmentId), shippingData);
  return shippingAddress;
};