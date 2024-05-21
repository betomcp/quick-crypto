import {
  cipherObject,
  cipherObjects,
  cipherValue,
  cipherValues,
  decipherObject,
  decipherObjects,
  decipherValue,
  decipherValues,
  generateKeyAndIv,
  getDefaultKeyAndIv,
} from "../src/easy-crypto";
const testStringArray = [
  ["teste one"],
  ["test two"],
  ["test large string lorem ipsum dolor sit amet"],
  [
    "eniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
  ],
];

const objectsList: any[] = [
  [{ age: 23, name: "test name", country: "brazil" }],
  [{ age: 23, name: "new name" }],
  [{ age: 23 }],
  [{ age: 23, name: "long new name lorem", country: "usa" }],
];

describe("EasyCrypto lib tests", () => {
  beforeEach(() => {
    delete process.env.EASY_CRYPTO_KEY;
    delete process.env.EASY_CRYPTO_IV;
  });

  it("should return an object with { key: string64len, iv: string32len }", () => {
    expect(generateKeyAndIv()).toEqual(
      expect.objectContaining({
        key: expect.stringMatching(/^.{32}$/),
        iv: expect.stringMatching(/^.{16}$/),
      })
    );
  });

  test.each(testStringArray)("should cipher and decipher value", (v) => {
    const cipher = cipherValue(v);
    expect(typeof cipher).toBe("string");
    expect(decipherValue(cipher)).toBe(v);
  });

  it("should cipher and decipher list of values", () => {
    const arr = testStringArray.map((v) => v[0]);
    const ciphers = cipherValues(arr);
    const allStrings = ciphers.every((item) => typeof item === "string");
    expect(Array.isArray(ciphers)).toBeTruthy();
    expect(allStrings).toBeTruthy();
    expect(decipherValues(ciphers)).toEqual(arr);
  });

  test.each(objectsList)("should cipher and decipher object", (v) => {
    const cipher = cipherObject<typeof v>(v, ["name", "country"]);
    expect(typeof cipher.name).toBe(typeof v.name);
    expect(typeof cipher.country).toBe(typeof v.country);
    expect(decipherObject(cipher, ["name", "country"])).toEqual(v);
  });

  it("should cipher and decipher array of objects", () => {
    const arr = objectsList.map(o => o[0]);
    const ciphers = cipherObjects(arr, ['name', 'country']);
    expect(Array.isArray(ciphers)).toBeTruthy();
    expect(decipherObjects(ciphers, ['name', 'country'])).toEqual(arr);
  })

  test.each(objectsList)("should cipher and decipher object all properties", (v) => {
    const cipher = cipherObject<typeof v>(v);
    expect(typeof cipher.name).toBe(typeof v.name);
    expect(typeof cipher.country).toBe(typeof v.country);
    expect(decipherObject(cipher)).toEqual(v);
  });

  it("should cipher and decipher array of objects all properties", () => {
    const arr = objectsList.map(o => o[0]);
    const ciphers = cipherObjects(arr);
    expect(Array.isArray(ciphers)).toBeTruthy();
    expect(decipherObjects(ciphers)).toEqual(arr);
  })

  it("should return default key and iv", () => {
    expect(getDefaultKeyAndIv()).toEqual(
      expect.objectContaining({
        key: expect.stringMatching(/^.{32}$/),
        iv: expect.stringMatching(/^.{16}$/),
      })
    );
  })

  it("should use env variables to set key and iv", () => {
    process.env.EASY_CRYPTO_KEY = "12345678901234567890123456789012";
    process.env.EASY_CRYPTO_IV = "1234567890123456";
    const arr = objectsList.map(o => o[0]);
    const ciphers = cipherObjects(arr);
    expect(Array.isArray(ciphers)).toBeTruthy();
    expect(decipherObjects(ciphers, undefined, process.env.EASY_CRYPTO_KEY, process.env.EASY_CRYPTO_IV)).toEqual(arr);
  });

  it("should use default key and iv if not given", () => {
    const arr = objectsList.map(o => o[0]);
    const ciphers = cipherObjects(arr);
    expect(Array.isArray(ciphers)).toBeTruthy();
    const defaultKey = getDefaultKeyAndIv().key;
    const defaultIv = getDefaultKeyAndIv().iv;
    expect(decipherObjects(ciphers, undefined, defaultKey, defaultIv)).toEqual(arr);
  });
});
