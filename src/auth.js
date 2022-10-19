export const BASE_URL = 'https://auth.nomoreparties.co';

const request = async ({
  url,
  method = 'POST',
  token,
  data
}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...!!token && { 'Authorization': `Bearer ${token}` }
    },
    ...!!data && { body: JSON.stringify(data) }
  });
  if (!res.ok)
    return Promise.reject(res.status);
  return await res.json();
}

export const register = (password, email) => {
    return request({
      url: '/signup',
      data: {password, email}
    });
  };

export const authorize = (password, email) => {
  return request({
    url: '/signin',
    data: {password, email}
  });
};

export const getContent = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token
  });
}

