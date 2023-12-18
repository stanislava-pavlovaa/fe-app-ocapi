import { HOST, SITE, OCAPI_VERSION, CLIENT_ID } from './constants';

export const BASE_URL = `${HOST}/s/Sites-${SITE}-Site/dw/shop/${OCAPI_VERSION}`;

export const AUTH_URL = `${BASE_URL}/customers/auth`; 

export const getContentEndpoint = (cid) => `${BASE_URL}/content/${cid}?client_id=${CLIENT_ID}`;

export const getProductEndpoint = (pid) => `${BASE_URL}/products/${pid}?client_id=${CLIENT_ID}&expand=images,prices,availability,variations,options,bundled_products`;

export const CREATE_BASKET_URL = `${BASE_URL}/baskets`; 

export const getExistingBasketEndpoint = (basketId) => `${BASE_URL}/baskets/${basketId}`; 

export const getAddProductItemEndpoint = (basketId) => `${BASE_URL}/baskets/${basketId}/items`; 

export const getRemoveProductItemEndpoint = (basketId, productId) => `${BASE_URL}/baskets/${basketId}/items/${productId}`;

export const getAddShippingMethodsEndpoint = (basketId, shipmentId) => `${BASE_URL}/baskets/${basketId}/shipments/${shipmentId}/shipping_method`;

export const getShippingMethodsEndpoint = (basketId, shipmentId) => `${BASE_URL}/baskets/${basketId}/shipments/${shipmentId}/shipping_methods`;

export const getAddShippingAddressEndpoint = (basketId, shipmentId) => `${BASE_URL}/baskets/${basketId}/shipments/${shipmentId}/shipping_address`;

export const getAddBillingAddressEndpoint = (basketId) => `${BASE_URL}/baskets/${basketId}/billing_address`;

export const getPaymentMethodsEndpoint = (basketId) => `${BASE_URL}/baskets/${basketId}/payment_methods`;

export const getAddPaymentInstrumentsEndpoint = (basketId) => `${BASE_URL}/baskets/${basketId}/payment_instruments`;

export const CREATE_ORDER_URL = `${BASE_URL}/orders`; 
