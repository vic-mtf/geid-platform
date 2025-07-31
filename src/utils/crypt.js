import CryptoJS from "crypto-js";

const _KEY_WORD = "2ABCDEFGH14544n@XHWGDHGDQRS@@UVWXYZabcdefgh?cvghgcff!$$hgh";

export const encrypt = (obj) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(obj), _KEY_WORD).toString();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const decrypt = (cipher) => {
  try {
    return JSON.parse(
      CryptoJS.AES.decrypt(cipher, _KEY_WORD).toString(CryptoJS.enc.Utf8)
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

const crypt = { encrypt, decrypt };
export default crypt;
