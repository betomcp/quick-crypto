import { createCipheriv, createDecipheriv } from "crypto";
import * as crypto from "crypto";

const defaultIv = "5fbe50e741c064f8";
const defaultKey = "011b73647d13adbafa9351fdb1ec0698";


/**
 * cipher the properties defined in the second parameter.
 * If no property is given, cipher all string properties.
 *
 * @param obj object to cipher
 *
 * @param propertiesToEncrypt string[] - name of the object properties to cipher
 *
 * @param keyCipher string - key to cipher strings (32 len). If it's not given, the default key is used
 *
 * @param iv string - initialization string (16 len). If it's not given, default iv is used
 *
 * @return  object with encrypted properties
 */

function cipherObject<T extends Record<string, any>>(
  obj: T,
  propertiesToEncrypt?: (keyof T)[],
  keyCipher?: string,
  iv?: string
): T {
  keyCipher = keyCipher ? keyCipher : defaultKey;
  iv = iv ? iv : defaultIv;
  propertiesToEncrypt = propertiesToEncrypt
    ? propertiesToEncrypt
    : Object.keys(obj);
  for (const key of propertiesToEncrypt) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "string") {
        const cipher = createCipheriv("aes256", keyCipher, iv);
        const encrypted =
          cipher.update(obj[key], "utf-8", "hex") + cipher.final("hex");
        obj[key] = encrypted as T[keyof T];
      }
    }
  }

  return obj;
}


/**
 * cipher the properties defined in the second parameter of each object in the array.
 * If no property is given, cipher all string properties.
 *
 * @param obj[] object[] - array of objects to cipher
 *
 * @param propertiesToEncrypt string[] - name of the object properties to cipher
 *
 * @param keyCipher string - key to cipher strings (32 len). If it's not given, the default key is used
 *
 * @param iv string - initialization string (16 len). If it's not given, default iv is used
 *
 * @return array of objects with encrypted properties
 */

function cipherObjects<T extends Record<string, any>>(
  objects: T[],
  propertiesToEncrypt?: (keyof T)[],
  keyCipher?: string,
  iv?: string
): T[] {
  keyCipher = keyCipher ? keyCipher : defaultKey;
  iv = iv ? iv : defaultIv;
  for (let obj of objects) {
    propertiesToEncrypt = propertiesToEncrypt
      ? propertiesToEncrypt
      : Object.keys(obj);
    for (const key of propertiesToEncrypt) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === "string") {
          const cipher = createCipheriv("aes256", keyCipher, iv);
          const encrypted =
            cipher.update(obj[key], "utf-8", "hex") + cipher.final("hex");
          obj[key] = encrypted as T[keyof T];
        }
      }
    }
  }

  return objects;
}

/**
 * decipher the properties defined in the second parameter.
 * If no property is given, decipher all string properties.
 *
 * @param obj object to decipher
 *
 * @param propertiesToEncrypt string[] - name of the object properties to decipher
 *
 * @param keyCipher string - key to cipher strings (32 len). If it's not given, the default key is used
 *
 * @param iv string - initialization string (16 len). If it's not given, default iv is used 
 *
 * @return object with deciphered properties
 */

function decipherObject<T extends Record<string, any>>(
  obj: T,
  propertiesToDecrypt?: (keyof T)[],
  keyCipher?: string,
  iv?: string
): T {
  keyCipher = keyCipher ? keyCipher : defaultKey;
  iv = iv ? iv : defaultIv;
  propertiesToDecrypt = propertiesToDecrypt
    ? propertiesToDecrypt
    : Object.keys(obj);
  for (const key of propertiesToDecrypt) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "string") {
        const decipher = createDecipheriv("aes256", keyCipher, iv);
        const decrypted =
          decipher.update(obj[key], "hex", "utf-8") + decipher.final("utf-8");
        obj[key] = decrypted as T[keyof T];
      }
    }
  }

  return obj;
}

/**
 * decipher the properties defined in the second parameter of each object in the array.
 * If no property is given, decipher all string properties.
 *
 * @param obj objects to decipher
 *
 * @param propertiesToEncrypt string[] - name of the object properties to decipher
 *
 * @param keyCipher string - key to cipher strings (32 len). If it's not given, the default key is used
 *
 * @param iv string - initialization string (16 len). If it's not given, default iv is used
 * 
 * @return Array of objects with deciphered properties
 */

function decipherObjects<T extends Record<string, any>>(
  objects: T[],
  propertiesToDecrypt?: (keyof T)[],
  keyCipher?: string,
  iv?: string
): T[] {
  keyCipher = keyCipher ? keyCipher : defaultKey;
  iv = iv ? iv : defaultIv;
  for (let obj of objects) {
    propertiesToDecrypt = propertiesToDecrypt
      ? propertiesToDecrypt
      : Object.keys(obj);
    for (const key of propertiesToDecrypt) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === "string") {
          const decipher = createDecipheriv("aes256", keyCipher, iv);
          const decrypted =
            decipher.update(obj[key], "hex", "utf-8") + decipher.final("utf-8");
          obj[key] = decrypted as T[keyof T];
        }
      }
    }
  }

  return objects;
}

/**
 * Cipher the value in the first param
 *
 * @param value string - string to cipher
 *
 * @param keyCipher string - key to cipher strings (32 len). If it's not given, the default key is used
 *
 * @param iv string - initialization string (16 len). If it's not given, default iv is used
 *
 * @return Ciphered string
 */

function cipherValue(value: string, keyCipher?: string, iv?: string): string {
  keyCipher = keyCipher ? keyCipher : defaultKey;
  iv = iv ? iv : defaultIv;
  const cipher = createCipheriv("aes256", keyCipher, iv);
  const encrypted = cipher.update(value, "utf-8", "hex") + cipher.final("hex");

  return encrypted;
}

/**
 * Cipher the values in the array (first param)
 *
 * @param values string[] - Array of strings to cipher
 *
 * @param keyCipher string - key to cipher strings (32 len). If it's not given, the default key is used
 *
 * @param iv string - initialization string (16 len). If it's not given, default iv is used
 *
 * @return Ciphered string array
 */

function cipherValues(
  values: string[],
  keyCipher?: string,
  iv?: string
): string[] {
  keyCipher = keyCipher ? keyCipher : defaultKey;
  iv = iv ? iv : defaultIv;
  const res: string[] = [];
  for (let value of values) {
    const cipher = createCipheriv("aes256", keyCipher, iv);
    const encrypted =
      cipher.update(value, "utf-8", "hex") + cipher.final("hex");
    res.push(encrypted);
  }
  return res;
}

/**
 * Decipher the value in the first param
 *
 * @param value string - String to cipher
 *
 * @param keyCipher string - key to cipher strings (32 len). If it's not given, the default key is used
 *
 * @param iv string - initialization string (16 len). If it's not given, default iv is used
 *
 * @return Deciphered string
 */

function decipherValue(value: string, keyCipher?: string, iv?: string): string {
  keyCipher = keyCipher ? keyCipher : defaultKey;
  iv = iv ? iv : defaultIv;
  const decipher = createDecipheriv("aes256", keyCipher, iv);
  const decrypted =
    decipher.update(value, "hex", "utf-8") + decipher.final("utf-8");

  return decrypted;
}

/**
 * Decipher the values in the array (first param)
 *
 * @param values string[] - Array of strings to decipher
 *
 * @param keyCipher string - key to cipher strings (32 len). If it's not given, the default key is used
 *
 * @param iv string - initialization string (16 len). If it's not given, default iv is used
 *
 * @return Deciphered string array
 */

function decipherValues(
  values: string[],
  keyCipher?: string,
  iv?: string
): string[] {
  keyCipher = keyCipher ? keyCipher : defaultKey;
  iv = iv ? iv : defaultIv;
  const res: string[] = [];
  for (let value of values) {
    const decipher = createDecipheriv("aes256", keyCipher, iv);
    const decrypted =
      decipher.update(value, "hex", "utf-8") + decipher.final("utf-8");
    res.push(decrypted);
  }

  return res;
}

/**
 * Return an object with a random iv and a random key to cipher new values
 *
 * @return object - { key: string, iv: string }
 */

function generateKeyAndIv() {
  const key = crypto.randomBytes(16).toString("hex");
  const iv = crypto.randomBytes(8).toString("hex");
  return { key, iv };
}

/**
 * Return an object with the default iv and the default key
 *
 * @return object - { key: string, iv: string }
 */

function getDefaultKeyAndIv() {
  return { key: defaultKey, iv: defaultIv };
}

export {
  generateKeyAndIv,
  decipherValues,
  decipherValue,
  cipherValues,
  cipherValue,
  cipherObject,
  cipherObjects,
  decipherObject,
  decipherObjects,
  getDefaultKeyAndIv,
};
