/**
 * Get storage.
 *
 * @param {String} key : whose value to get.
 */
export function get(key) {
  return localStorage.getItem(key);
}

/**
 * Set storage.
 *
 * @param {String} key : whose Value to set.
 * @param {String} value : Value to set.
 */
export function set(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Remove key value pair in storage.
 *
 * @param {string} key
 */
export function remove(key) {
  localStorage.removeItem(key);
}
