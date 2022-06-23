/* This service takes care of:
- Encrypt and Decrypt text
*/

const CryptoJS = require('crypto-js');
const CryptoKey = '70iQ0h8cEoFa';

function encrypt(text) {
  try {
    const encryptedValue = encodeURIComponent(
      CryptoJS.AES.encrypt(text, 'CryptoKey').toString()
    );
    return encryptedValue;
  } catch (error) {
    return 'N/A';
  }
}

function decrypt(text) {
  try {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(text), 'CryptoKey');
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  } catch (error) {
    return 'Error';
  }
}

module.exports = {
  encrypt,
  decrypt,
};
