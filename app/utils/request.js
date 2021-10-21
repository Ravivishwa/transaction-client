import 'whatwg-fetch';
import axios from 'axios';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  if (response.headers['content-range']) {
    const matches = response.headers['content-range'].match(
      /(\d+)-(\d+)\/(\d+)/,
    );
    const limit = parseInt(response.headers['x-range-limit'], 10);
    const totalPages = Math.ceil(parseInt(matches[3], 10) / limit);
    const page = Math.ceil(parseInt(matches[2], 10) / limit);
    return { page, totalPages, data: response.data };
  }
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(
    response.message || response.statusText,
    response.code || response.status,
  );
  error.response = response;
  throw error;
}

function parseError(response) {
  const error = {
    message:
      response.data.detail || response.data.message || response.statusText,
    status: response.data.code || response.status,
  };
  throw error;
}

/**
 * Encodes data into query params
 *
 * @param  {object} [data] The data we want to pass to "fetch"
 *
 * @return {string} The response data
 */
function encodeQuery(data) {
  return Object.keys(data)
    .map(key => [key, data[key]].map(encodeURIComponent).join('='))
    .join('&');
}

/**
 * Removed undefined from an object
 *
 * @param  {object} [obj] The object to clean up
 *
 * @return {object} The cleaned up object
 */
function cleanObject(obj) {
  const ret = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) ret[key] = obj[key];
  });
  return ret;
}

const defaultOptions = {
  method: 'GET',
  headers: {},
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {object} [data] The data we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, data = false, options = {}) {
  const fetchOptions = { ...defaultOptions, ...cleanObject(options) };
  fetchOptions.url = url;

  if (data) {
    if (fetchOptions.method === 'GET') {
      fetchOptions.url = `${url}?${encodeQuery(data)}`;
    } else if (data instanceof FormData) {
      fetchOptions.data = data;
    } else {
      fetchOptions.data = data;
    }
  }

  return axios
    .request(fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => parseError(error.response));
}
