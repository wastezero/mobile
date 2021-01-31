import { SERVER_URL } from './url';
import { GetTokenFromStorage } from '../utils';

const OrderUrl = '/client/orders';
const MyOrderUrl = '/client/my_orders';

export const GetOrders = async () => {
  try {
    const response = await fetch(SERVER_URL + OrderUrl);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

const generatePriceFilter = (minPrice, maxPrice) => {
  const MAX_NUMBER = 1000000000;
  return `min_price=${minPrice || 0}&max_price=${maxPrice || MAX_NUMBER}`;
};

const generateCoordsFilter = (userLocation) => {
  return `lat=${userLocation.latitude}&lng=${userLocation.longitude}`;
};

export const GetOrdersByFilters = async (filters) => {
  try {
    const { minPrice, maxPrice, userLocation } = filters;
    const urlString = `${SERVER_URL}${OrderUrl}?${generatePriceFilter(
      minPrice,
      maxPrice,
    )}&${userLocation ? generateCoordsFilter(userLocation) : ''}`;
    const response = await fetch(urlString);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const GetOrder = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}${OrderUrl}/${id}`);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const MakeOrder = async (id) => {
  try {
    const token = await GetTokenFromStorage();
    const response = await fetch(`${SERVER_URL}${OrderUrl}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const GetMyOrders = async () => {
  try {
    const token = await GetTokenFromStorage();
    const response = await fetch(`${SERVER_URL}${MyOrderUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const CancelOrder = async (id) => {
  try {
    const token = await GetTokenFromStorage();
    const response = await fetch(`${SERVER_URL}${MyOrderUrl}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
