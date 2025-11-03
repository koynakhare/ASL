/* eslint-disable no-empty */
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import { logoutSuccess } from '../redux/reducers/userReducer';
import { ALERT_SUCCESS } from '../redux/reducers/alertReducer';

export const getItemFromLocalStorage = (key, defaultValue = []) => {
  try {
    if (!localStorage.hasOwnProperty(key)) {
      return defaultValue;
    }
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  } catch (error) {
    return [];
  }
};

export const setItemToLocalStorage = (key, value) => {
  try {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) { }
};

export const removeItemFromLocalStorage = (key) => {
  try {
    if (!localStorage.hasOwnProperty(key)) {
      return;
    }
    localStorage.removeItem(key);
  } catch (error) { }
};


export const convertDateToStringFormat = (date, year, showToday) => {
  if (date) {
    const today = moment().startOf('day');
    const inputDate = moment(date).startOf('day');

    if (showToday && inputDate.isSame(today)) {
      return 'Today';
    }

    if (year) {
      return moment(date).format('YYYY-MM-DD');
    }
    return moment(date).format('MM/DD/YYYY');
  }
  return '';
};


export const getDateWithTime = (dateString) => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const localDate = moment(dateString).utcOffset(-offset);

  return localDate.format('MMM D, YYYY, h:mm A');
};

export const formatNumber = (value) => (value && !isNaN(value) ? parseFloat(value) : '0');
export const formattedPrice = (price) => {
  let value = formatNumber(price);
  if (value) {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    return value
      ?.toString()
      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  } else {
    return value;
  }
};

export const logoutUser = (dispatch, navigate) => {
  removeItemFromLocalStorage('token');
  dispatch(logoutSuccess());
  if (navigate) {
    navigate('/')
  } else {
    window.location.href = '/';
  }
};

export const notification = (success, message, error = false) => ({
  type: ALERT_SUCCESS,
  payload: { success, message, error }
});


// Format price using Indian currency format
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

export function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
