/**
 * 
 * @param {string} path 
 * @returns Promise
 */
export function loadInfo(path = '/pets.json') {
  return fetch(path).then(response =>response.json());
}
