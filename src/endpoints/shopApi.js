import { HOST, SITE, OCAPI_VERSION, CLIENT_ID } from './constants';

export const BASE_URL = `${HOST}/s/Sites-${SITE}-Site/dw/shop/${OCAPI_VERSION}`;

export const AUTH = `${BASE_URL}/customers/auth`; 

export const getContentEndpoint = (cid) => `${BASE_URL}/content/${cid}?client_id=${CLIENT_ID}`;
