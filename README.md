# Easy Crypto
### An easy way to cipher and decipher objects and simple strings with TypeScript.
With this library, you can easily encrypt both complex objects and simple values.

## Instalation
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
#### Each method will be explained below.
```
- cipherObject(object, propertiesToEncrypt?, keyCipher?, iv?): object
- decipherObject(object, propertiesToDecrypt?, keyCipher?, iv?): object
- cipherObjects(object[], propertiesToEncrypt?, keyCipher?, iv?): object[]
- decipherObjects(object[], propertiesToDecrypt?, keyCipher?, iv?): object[]
- cipherValue(value, keyCipher?, iv?): value
- decipherValue(values, keyCipher?, iv?): value
- cipherValues(value[], keyCipher?, iv?): value[]
- decipherValues(value[], keyCipher?, iv?): value[]
- generateKeyAndIv(): { key: string, iv?: string }
- getDefaultKeyAndIv(): { key: string, iv?: string }
```

- _All cipher and decipher methods have the option to recive a custom key and iv. If they are not given in the params, the values will be cryptographed with the default key of this library._

- _To generate your own key and iv, you can use the method ``generateKeyAndIv()``, and if you need to know the default key and iv, it is possible to use the method ``getDefaultKeyAndIv()``_

- _The best aproach to use this in production would be to generate custom keys and ivs with ``generateKeyAndIv()``_

- _It is possible to create your own key and iv, save in some database and use to cryptograph your data_

- _In the examples below, the encrypted values are just representative and are not the same as the real ones_

# cipherObject

- This method is used to easly crptograph any object properties.
- It is possible to pass an array of strings with the name of each property of the object that you want to encrypt.
- If no key and/or iv is given, it will use the default key and/or iv.
- Below there is an example of how this method works.

 #### Signature
```
cipherObject<T extends Record<string, any>>(obj: T, propertiesToEncrypt?: (keyof T)[], keyCipher?: string, iv?: string): T;
```

#### Examples
_Lets create an Address object to show how this method works._
```
import { cipherObject } from 'fast-crypto'
type Address = {
    street: string,
    number: number,
    state: string,
    city: string
}

const address: Address = {
    street: 'some street',
    number: 123,
    state: 'NY',
    city: 'New York'
}

// It will encrypt all string ptoperties and use the default key
// and iv
const cryptoAddress = cipherObject<Address>(address);
console.log(cryptoAddress)
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'jqwnkbdkwekwyeg7',
//   city: 'lenkwndekuw8'
// }


// It will encrypt all properties passed in the array at the
// second parameter and use the default key and iv
const cryptoAddress2 = cipherObject<Address>(address, ['street', 'city'])
console.log(cryptoAddress2)
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'NY',
//   city: 'lenkwndekuw8'
// }
```

#### Example (using custom key and iv)
```
import { cipherObject, generateKeyAndIv } from 'fast-crypto'

type Address = {
    street: string,
    number: number,
    state: string,
    city: string
}

const address: Address = {
    street: 'some street',
    number: 123,
    state: 'NY',
    city: 'New York'
}

// It will encrypt all properties passed in the array at the
// second parameter using the generated key and iv
const { key, iv } = generateKeyAndIv();
const cryptoAddress = cipherObject<Address>(address, ['street', 'city'], key, iv)
console.log(cryptoAddress)
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'NY',
//   city: 'lenkwndekuw8'
// }

// It will encrypt all string properties using the 
// generated key and iv
const { key, iv } = generateKeyAndIv();
const cryptoAddress2 = cipherObject<Address>(address, undefined, key, iv)
console.log(cryptoAddress2)
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'dkhbcdkd',
//   city: 'lenkwndekuw8'
// }

// It will encrypt all string properties using the 
// generated key and the default iv
const { key } = generateKeyAndIv();
const cryptoAddress3 = cipherObject<Address>(address, undefined, key)
console.log(cryptoAddress3)
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'dkhbcdkd',
//   city: 'lenkwndekuw8'
// }
```

# decipherObject

This method is used to decrypt an object.
The same key and iv used to encrypt the object need to be given.
If the default key and/or iv were used to encrypt the object, you don't need to pass any params.
Like the cipherObject method, in this one it is possible to give an array of strings with the name of each object propertie to be deccrypted.

 #### Signature
```
decipherObject<T extends Record<string, any>>(obj: T, propertiesToEncrypt?: (keyof T)[], keyCipher?: string, iv?: string): T;
```

#### Examples
_To show how this method works, we will create a encrypted address object._
```
import { decipherObject, generateKeyAndIv } from 'fast-crypto'

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

// It will decrypt all properties recived in the array at the second parametert.
// It will use a custom key and iv
const { key, iv } = generateKeyAndIv();
const decryptedAddress3 = decipherObject<Address>(encryptedAddress, ['street', 'city'], key, iv)
console.log(decryptedAddress3)
// { 
//   street: 'some street',
//   number: 123,
//   state: 'kjnknwswkjkwjn',
//   city: 'New York'
// }
```

# cipherObjects
- This method is very similar with the _`cipherObject()`_ method, the diference is that this one recives an array of objects to encrypt intead of one single object.
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
//      number: 987,
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
//      number: 987,
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

// For each object in the array of encrypted addresses, it will 
// encrypt all properties passed in the array at the
// second parameter using the generated key and iv
const { key, iv } = generateKeyAndIv();
const cryptoAddress = cipherObjects<Address>(addresses, ['street', 'city'], key, iv)
console.log(cryptoAddress)
// [
//   { 
//      street: 'erblfebrfluierlwuhlrl738743bdwd',
//      number: 987,
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
//      number: 987,
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
//      number: 987,
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