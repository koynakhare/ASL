import { jwtDecode } from 'jwt-decode';
import { getItemFromLocalStorage } from './helper';
import { storeToken } from '../redux/reducers/userReducer';

export const getUserDetail = () => {
  let token = getItemFromLocalStorage('token');
  if (!token) {
    return null;
  }
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
};
export const insertToken = () => (dispatch) => {
  let token = getItemFromLocalStorage('token', '');
  if (token) {
    dispatch(storeToken(token));
  }
};