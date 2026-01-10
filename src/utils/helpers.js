// Utility functions for the API

/**
 * Format API response
 * @param {boolean} success - Whether the request was successful
 * @param {string} message - Response message
 * @param {any} data - Response data
 * @returns {object} Formatted response object
 */
const formatResponse = (success, message, data = null) => {
  const response = {
    success,
    message
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  return response;
};

/**
 * Handle async errors
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  formatResponse,
  asyncHandler,
  isValidUrl
};
