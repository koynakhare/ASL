/* eslint-disable no-unused-vars */
import axios from 'axios';
import { get } from 'lodash'; // Assuming you're using lodash for utility functions
import { getItemFromLocalStorage, logoutUser, notification, removeItemFromLocalStorage } from './helper';
import { base_url } from '../config';

const axiosInstance = axios.create({
  baseURL: base_url // Assuming 'location' is defined globally or imported from somewhere
});

const service = (config, includeToken = true, dispatch, contentType) => {
  let token = getItemFromLocalStorage('token');

  // Add token header if required
  if (includeToken) {
    config.headers = {
      ...config.headers, // Preserve existing headers
      Authorization: token,
    };
  }

  // Add Content-Type for FormData
  if (contentType === 'formdata') {
    config.headers = {
      ...config.headers,
      'Content-Type': 'multipart/form-data'
    };
  }

  // Axios interceptors for error handling
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      return handleErrors(error, dispatch); // Return a rejected promise to propagate the error further
    }
  );

  return axiosInstance(config); // Execute the axios request
};

export const handleErrors = async (error, dispatch) => {
  if (!error) {
    return Promise.reject('Something went wrong');
  }

  const { response, request, message, data } = error;
  if (response) {
    // The request was made and the server responded with a status code
    const { status, data ,error} = response;
    if (status === 401) {
      dispatch(notification(false, 'Unauthorized access', true));
      // await logoutUser(dispatch);

      return Promise.reject({ data: data } || 'Unauthorized access');
    } else if (status === 404) {
      return Promise.reject({ data: data } || 'Resource not found');
    } else if (status === 500) {
      return Promise.reject({ data: data } || 'Internal server error');
    } else {
      return Promise.reject({ data: data } || 'Server error');
    }
  } else if (request) {
    return Promise.reject('No response from server');
  } else {
    return Promise.reject(error || 'Unknown error occurred');
  }
};

const postRequest = (url, data, includeToken = true, dispatch) => {
  return service(
    {
      method: 'POST',
      url: `${base_url}${url}`,
      data
    },
    includeToken,
    dispatch
  )
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
const patchRequest = (url, data, includeToken = true, dispatch, contentType = null) => {
  return service(
    {
      method: 'PATCH',
      url: `${base_url}${url}`,
      data
    },
    includeToken,
    dispatch,
    contentType
  )
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const putRequest = (url, data, includeToken = true, dispatch) => {
  return service(
    {
      method: 'PUT',
      url: `${base_url}${url}`,
      data
    },
    includeToken,
    dispatch
  )
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const getRequest = (url, navigate, includeToken = true, dispatch) => {
  return service(
    {
      method: 'GET',
      url: `${base_url}${url}`
    },
    includeToken,
    dispatch
  )
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const deleletRequest = (url, data, includeToken = true, dispatch) => {
  return service(
    {
      method: 'DELETE',
      url: `${base_url}${url}`,
      data
    },
    includeToken,
    dispatch
  )
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export { postRequest, getRequest, deleletRequest, patchRequest, putRequest };
