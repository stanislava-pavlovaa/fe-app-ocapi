import { CLIENT_ID } from '../endpoints/constants';
import { AUTH_URL } from '../endpoints/shopApi';

export const getJWTToken = async () => {
  const jwtToken = localStorage.getItem('token');

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-dw-client-id': `${CLIENT_ID}`,
    },
    body: JSON.stringify({ type: 'guest' }),
  };

  if (jwtToken) {
    request.headers.Authorization = jwtToken;
  } else {
    try {
      const response = await fetch(AUTH_URL, request);
      const token = response.headers.get('authorization');
      localStorage.setItem('token', token);
      return token;
    } catch (err) {
      console.error(err);
    }
  }
};

const requestData = async (method, url, data) => {
  const dataRequest = {
    method,
    headers: {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
      'x-dw-client-id': `${CLIENT_ID}`,
    },
  };

  if (data) {
    dataRequest.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, dataRequest);
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const get = async (url, data) => {
  return requestData('GET', url, data);
};

export const post = async (url, data) => {
  return requestData('POST', url, data);
};

export const put = async (url, data) => {
  return requestData('PUT', url, data);
};

export const deleteAction = async (url, data) => {
  return requestData('Delete', url, data);
};
