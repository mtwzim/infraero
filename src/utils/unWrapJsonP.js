/**
 * Remove o callback do json e transforma em um objeto
 * @param {string} jsonp JsonP
 * @param {string} callback Callback utilizado pelo JsonP
 */
export default function unWrapJsonP(jsonp, callback = 'infraero') {
  // Remove a função, e transforma em um objeto javascript
  return JSON.parse(jsonp.slice(callback.length + 1, jsonp.length - 1));
}
