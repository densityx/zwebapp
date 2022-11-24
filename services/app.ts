import CryptoJS from 'crypto-js';

/**
 * Encrypt string using CryptoJs AES encrypt
 * */
export function encrypt(value: string) {
    return CryptoJS.AES.encrypt(value, process.env.NEXT_PUBLIC_AES_SECRET).toString();
}

/**
 * Decrypt string using CryptoJS AES decrypt
 * */
export function decrypt(value: string) {
    return CryptoJS.AES.decrypt(value, process.env.NEXT_PUBLIC_AES_SECRET).toString(CryptoJS.enc.Utf8);
}