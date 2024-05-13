import CryptoJS from 'crypto-js';
import config from '../config/config';


const USER_STORAGE_KEY = 'userEncryptedSessionStorage';

const encrypt = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), config.ENCRYPTION_KEY).toString();
  return encryptedData;
};

const decrypt = (encryptedData) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, config.ENCRYPTION_KEY);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    return null;
  }
};

const getSessionStorage = (key) => {
  const encryptedData = sessionStorage.getItem(key);
  console.log("emcrypted data ", encryptedData);
  if (encryptedData) {
    return decrypt(encryptedData);
  }
  return null;
};

const setSessionStorage = (key, data) => {
  const encryptedData = encrypt(data);
  sessionStorage.setItem(key, encryptedData);
};

const setUserSession = (data) => {
  setSessionStorage(USER_STORAGE_KEY, data);
}

const getUserSession = (index = null) => {
  let session_data = getSessionStorage(USER_STORAGE_KEY);
  console.log("session data ", session_data);
  if (index !== null) {
    return session_data[index] !== undefined ? session_data[index] : "";
  }
  return session_data;
}

const getToken = () => {
  return getUserSession("token");
}

const clearSessionStorage = () => {
  sessionStorage.clear()
};

export { setUserSession, clearSessionStorage, getUserSession, getToken };