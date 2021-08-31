import constants from '../constants';

/**
 *
 * @param {string} name
 * @param {string} prop
 * @param {string} timeValue
 * @returns Promise
 */
export function showMainItem (name, prop, timeValue) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.setState({ [name]: prop });
      resolve(true);
    }, timeValue);
  });
}
