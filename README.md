# Fast Crypto
### An easy way to encrypt and decrypt objects and simple strings with TypeScript.
With this library, you can easily encrypt both complex objects and simple values.

## Installation
```
npm install fast-crypto
```


## Build
```
npm run build
```

## Test
```
npm run test
```

### Methods list:
_These are the ten methods you can  use from this library:_ 
- _`cipherObject()`_
- _`decipherObject()`_
- _`cipherObjects()`_
- _`decipherObjects()`_
- _`cipherValue()`_
- _`decipherValue()`_
- _`cipherValues()`_
- _`decipherValues()`_
- _`generateKeyAndIv()`_
- _`getDefaultKeyAndIv()`_

### Additional Notes 
- _All cipher and decipher methods have the option to receive a custom key and iv. If they are not provided, the values will be encrypted with the default key of this library._

- _To generate your own key and iv, you can use the method `generateKeyAndIv()`, and if you need to know the default key and iv, you can use the method `getDefaultKeyAndIv()`._

- _The best approach to use this in production would be to generate custom keys and ivs with ``generateKeyAndIv()``._

- _It is possible to create your own key and iv, save them in a database, and use them to encrypt your data._

- _In the examples below, the encrypted values are just representative and are not the same as the real ones._
#### Each method will be explained below.

# cipherObject

- This method is used to easily encrypt any object properties.
- You can pass an array of strings with the names of the properties of the object that you want to encrypt.
- If no key and/or iv is given, it will use the default key and/or iv.
- Below is an example of how this method works.

 #### Signature
```
cipherObject<T extends Record<string, any>>(obj: T, propertiesToEncrypt?: (keyof T)[], keyCipher?: string, iv?: string): T;
```

#### Examples
_Let's create an Address object to show how this method works._
```
import { cipherObject } from 'fast-crypto';

type Address = {
    street: string,
    number: number,
    state: string,
    city: string
};

const address: Address = {
    street: 'some street',
    number: 123,
    state: 'NY',
    city: 'New York'
};

// It will encrypt all string properties and use the default key and iv
const cryptoAddress = cipherObject<Address>(address);
console.log(cryptoAddress);
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'jqwnkbdkwekwyeg7',
//   city: 'lenkwndekuw8'
// }

// It will encrypt only the properties passed in the array in the second parameter and use the default key and iv
const cryptoAddress2 = cipherObject<Address>(address, ['street', 'city']);
console.log(cryptoAddress2);
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'NY',
//   city: 'lenkwndekuw8'
// }
```

#### Example (using custom key and iv)
```
import { cipherObject, generateKeyAndIv } from 'fast-crypto';

type Address = {
    street: string,
    number: number,
    state: string,
    city: string
};

const address: Address = {
    street: 'some street',
    number: 123,
    state: 'NY',
    city: 'New York'
};

// It will encrypt only the properties passed in the array in the second parameter using the generated key and iv
const { key, iv } = generateKeyAndIv();
const cryptoAddress = cipherObject<Address>(address, ['street', 'city'], key, iv);
console.log(cryptoAddress);
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'NY',
//   city: 'lenkwndekuw8'
// }

// It will encrypt all string properties using the generated key and iv
const { key: key2, iv: iv2 } = generateKeyAndIv();
const cryptoAddress2 = cipherObject<Address>(address, undefined, key2, iv2);
console.log(cryptoAddress2);
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'dkhbcdkd',
//   city: 'lenkwndekuw8'
// }

// It will encrypt all string properties using the generated key and the default iv
const { key: key3 } = generateKeyAndIv();
const cryptoAddress3 = cipherObject<Address>(address, undefined, key3);
console.log(cryptoAddress3);
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'dkhbcdkd',
//   city: 'lenkwndekuw8'
// }
```

# decipherObject

- This method is used to decrypt an object.
- The same key and iv used to encrypt the object need to be provided.
- If the default key and/or iv were used to encrypt the object, you don't need to pass any parameters.
- Similar to the `cipherObject` method, you can pass an array of strings with the names of the object properties to be decrypted.

#### Signature
```typescrypt
decipherObject<T extends Record<string, any>>(obj: T, propertiesToEncrypt?: (keyof T)[], keyCipher?: string, iv?: string): T;
```

#### Examples
_To show how this method works, we will create a encrypted address object._
```
import { decipherObject } from 'fast-crypto'

type Address = {
    street: string,
    number: number,
    state: string,
    city: string
}

const encryptedAddress: Address = {
    street: 'skjdckkdkwnjkqlklqwxwxw',
    number: 123,
    state: 'qlqnknslqskqnl',
    city: 'endkwdxkwnjknwnjxwk'
}

// It will decrypt all string properties of the object.
// It will use the default key and iv.
const decryptedAddress = decipherObject<Address>(encryptedAddress)
console.log(decryptedAddress)
// { 
//   street: 'some street',
//   number: 123,
//   state: 'NY',
//   city: 'New York'
// }

// It will decrypt all properties recived in the array at the second parametert.
// It will use the default key and iv.
const decryptedAddress2 = decipherObject<Address>(encryptedAddress, ['street', 'city'])
console.log(decryptedAddress2)
// { 
//   street: 'some street',
//   number: 123,
//   state: 'kjnknwswkjkwjn',
//   city: 'New York'
// }
```
- _To use a custom key and iv to decipher objects, it must be the same key and iv used to encrypt the object_


# cipherObjects
- This method is very similar with the _`cipherObject()`_ method, the diference is that this one recives an array of objects to encrypt instead of one single object.
- This method is used to easly cryptograph any array of objects.
- It is possible to pass an array of strings with the name of each property of the object that you want to encrypt.
- If no key and/or iv is given, it will use the default key and/or iv.
- It will retur an array of objects from the same type as the objects in the array given.
- Below there is an example of how this method works.

 #### Signature
```
cipherObjects<T extends Record<string, any>>(obj: T[], propertiesToEncrypt?: (keyof T)[], keyCipher?: string, iv?: string): T[];
```

#### Examples
_Lets create an Address object and an array of addresses to show how this method works_
```
import { cipherObjects } from 'fast-crypto'
type Address = {
    street: string,
    number: number,
    state: string,
    city: string
}

const addresses: Address[] = [
  {
    street: 'some street',
    number: 123,
    state: 'NY',
    city: 'New York'
  },
  {
    street: 'some other street',
    number: 987,
    state: 'CA',
    city: 'San Francisco'
  }
]

// It will encrypt all string ptoperties of all objects in the 
// array and use the default key and iv
const cryptoAddresses = cipherObjects<Address>(addresses);
console.log(cryptoAddresses)
// [
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 123,
//      state: 'jqwnkbdkwekwyeg7',
//      city: 'lenkwndekuw8'
//   },
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 987,
//      state: 'jqwnkbdkwekwyeg7',
//      city: 'lenkwndekuw8'
//   }
// ] 


// It will encrypt all properties passed in the array at the
// second parameter of all objects in the addresses array and use 
// the default key and iv
const cryptoAddresses2 = cipherObjects<Address>(addresses, ['street', 'city'])
console.log(cryptoAddresses2)
// [
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 123,
//      state: 'NY',
//      city: 'lenkwndekuw8'
//   },
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 987,
//      state: 'CA',
//      city: 'lenkwndekuw8'
//   }
// ] 
```

#### Example (using custom key and iv)
```
import { cipherObjects, generateKeyAndIv } from 'fast-crypto'

type Address = {
    street: string,
    number: number,
    state: string,
    city: string
}

const addresses: Address[] = [
  {
    street: 'some street',
    number: 123,
    state: 'NY',
    city: 'New York'
  },
  {
    street: 'some other street',
    number: 987,
    state: 'CA',
    city: 'San Francisco'
  }
]

// For each object in the array of addresses, it will 
// encrypt all properties passed in the array at the
// second parameter using the generated key and iv
const { key, iv } = generateKeyAndIv();
const cryptoAddress = cipherObjects<Address>(addresses, ['street', 'city'], key, iv)
console.log(cryptoAddress)
// [
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 123,
//      state: 'NY',
//      city: 'lenkwndekuw8'
//   },
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 987,
//      state: 'CA',
//      city: 'lenkwndekuw8'
//   }
// ] 

// It will encrypt all string properties of all objects in the 
// addresses array using the generated key and iv
const { key, iv } = generateKeyAndIv();
const cryptoAddresses2 = cipherObject<Address>(addresses, undefined, key, iv)
console.log(cryptoAddresses2)
// [
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 123,
//      state: 'bkjsw',
//      city: 'lenkwndekuw8'
//   },
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 987,
//      state: 'kqjwksq',
//      city: 'lenkwndekuw8'
//   }
// ] 

// It will encrypt all string properties of all objects in the 
// addresses array using the 
// generated key and the default iv
const { key } = generateKeyAndIv();
const cryptoAddresses3 = cipherObjects<Address>(addresses, undefined, key)
console.log(cryptoAddresses3)
// [
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 123,
//      state: 'bkjsw',
//      city: 'lenkwndekuw8'
//   },
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 987,
//      state: 'kqjwksq',
//      city: 'lenkwndekuw8'
//   }
// ] 
```

# decipherObjects
- This method is very similar with the _`decipherObject()`_ method, the diference is that this one recives an array of encrypted objects to decrypt instead of one single object.
- This method is used to easly decrypt any array of objects.
- It is possible to pass an array of strings with the name of each property of the objects that you want to decrypt.
- If no key and/or iv is given, it will use the default key and/or iv.
- It will retur an array of objects from the same type as the objects in the array given.
- Below there is an example of how this method works.

 #### Signature
```
decipherObjects<T extends Record<string, any>>(obj: T[], propertiesToEncrypt?: (keyof T)[], keyCipher?: string, iv?: string): T[];
```

#### Examples
_Lets create an Address object and an array of addresses to show how this method works_
```
import { decipherObjects } from 'fast-crypto'
type Address = {
    street: string,
    number: number,
    state: string,
    city: string
}

const addresses: Address[] = [
  {
    street: 'eldnel2kwl2w2lsm22',
    number: 123,
    state: 'w2knsk2wjk2k',
    city: 'ls2wkjnksjn2kjwnk'
  },
  {
    street: '2kwl2wm2lwk2wl2lw',
    number: 987,
    state: 'kwml2mw2swkl2',
    city: '2lkmw2lm2ls'
  }
]

// It will decrypt all string ptoperties of all objects in the 
// array and use the default key and iv
const decryptedAddresses = decipherObjects<Address>(addresses);
console.log(decryptedAddresses)
// [
//  {
//      street: 'some street',
//      number: 123,
//      state: 'NY',
//      city: 'New York'
//  },
//  {
//      street: 'some other street',
//      number: 987,
//      state: 'CA',
//      city: 'San Francisco'
//  }
// ] 


// It will decrypt all properties passed in the array at the
// second parameter of all objects in the addresses array 
// use the default key and iv
const decryptedAddresses2 = cipherObjects<Address>(addresses, ['street', 'city'])
console.log(decryptedAddresses2)
// [
//  {
//      street: 'some street',
//      number: 123,
//      state: 'w2knsk2wjk2k',
//      city: 'New York'
//  },
//  {
//      street: 'some other street',
//      number: 987,
//      state: 'kwml2mw2swkl2',
//      city: 'San Francisco'
//  }
// ] 
```
- _To use a custom key and iv to decipher objects, it must be the same key and iv used to encrypt the object_

# cipherValue, decipherValue, cipherValues and decipherValues

- This methods are used to encrypt and decrypt strings or an array of strings
- It is possible yo use the default key and iv, or a custom one, like the other methods of this library.

#### Signature
```
cipherValue(value: string, key?: string, iv?: string): string;
decipherValue(value: string, key?: string, iv?: string): string;
cipherValues(value: string, key?: string, iv?: string): string;
decipherValues(value: string, key?: string, iv?: string): string;
```

#### Examples single string and default key and iv
```
import { cipherValue, decipherValue } from 'faast-crypto'

const myString = 'hello';

// encrypt the value with default key and iv
const encrypted = cipherValue(myString);
console.log(encrypted)
// jk3k3ej3bkde3

// decrypt value
const decrypted = decipherValue(encrypted);
console.log(decrypted)
// hello
```
#### Examples single string and custom key and iv
```
import { cipherValue, decipherValue, generateKeyAndIv } from 'faast-crypto'

const { key, iv } = generateKeyAndIv();
const myString = 'hello';

// encrypt the value with custom key and iv
const encrypted = cipherValue(myString, key, iv);
console.log(encrypted)
// jk3k3ej3bkde3

// decrypt value
const decrypted = decipherValue(encrypted, key, iv);
console.log(decrypted)
// hello
```
#### Examples array of strings and default key and iv
```
import { cipherValues, decipherValues } from 'faast-crypto'

const myStringArray = ['hello', 'world', 'code'];

// encrypt each value with default key and iv
const encrypted = cipherValues(myStringArray);
console.log(encrypted)
// ['ml2nkws2l', 'k2jwk2kn2', '2ljw2nkw2']

// decrypt value
const decrypted = decipherValues(encrypted);
console.log(decrypted)
// ['hello', 'world', 'code']
```
#### Examples array of strings and custom key and iv
```
import { cipherValues, decipherValues, generateKeyAndIv } from 'faast-crypto'

const { key, iv } = generateKeyAndIv();
const myStringArray = ['hello', 'world', 'code'];

// encrypt the value with custom key and iv
const encrypted = cipherValues(myStringArray, key, iv);
console.log(encrypted)
// ['ml2nkws2l', 'k2jwk2kn2', '2ljw2nkw2']

// decrypt value
const decrypted = decipherValues(encrypted, key, iv);
console.log(decrypted)
// ['hello', 'world', 'code']
```

# generateKeyAndIv

- This metod is used to generate a random key and iv to encrypt values.
- It will return a 32 charachteres key and a 16 characchteres iv.

#### Signature
```
generateKeyAndIv(): { key: string, iv: string }
```

#### Example
```
import { generateKeyAndIv } from 'fast-crypto';

const { key, iv } = generateKeyAndIv();
console.log(key, iv);
// 456s73667d1dadbafa935dgba3ecdfkl
// t7654wedsdr0679l
```

# getDefaultKeyAndIv

- This metod returns teh default key and iv used in this library and is just recomended for tests.
- It will return a 32 charachteres key and a 16 characchteres iv.

#### Signature
```
getDefaultKeyAndIv(): { key: string, iv: string }
```

#### Example
```
import { getDefaultKeyAndIv } from 'fast-crypto';

const { key, iv } = getDefaultKeyAndIv();
console.log(key, iv);
// 456s73667d1dadbafa935dgba3ecdfkl
// t7654wedsdr0679l
```