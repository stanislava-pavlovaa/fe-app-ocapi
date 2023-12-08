import { CLIENT_ID } from '../endpoints/constants';
import { AUTH } from '../endpoints/shopApi';

export const getJWTToken = async () => {
  const jwtToken = localStorage.getItem('jwtToken');

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-dw-client-id': `${CLIENT_ID}`,
    },
  };

  if (jwtToken) {
    request.headers.Authorization = jwtToken;

    const body = { type: 'guest' };
    request.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(AUTH, request);
    const token = response.headers.get('authorization');
    localStorage.setItem('token', token);
    return token;
  } catch (err) {
    console.error(err);
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

const requestData = async (method, url, data) => {
    const dataRequest = {
        method,
        headers: {
            'Authorization': await getJWTToken(),
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
