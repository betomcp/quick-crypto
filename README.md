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

# cipherObject

This method is used to easly crptograph any object properties.
Below there is an example of how this method works.

 #### Signature
```
cipherObject<T extends Record<string, any>>(obj: T, propertiesToEncrypt?: (keyof T)[], keyCipher?: string, iv?: string): T;
```

#### Examples
```
import { cipherObject } from 'fast-crypto'

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

const cryptoAddress3 = cipherObject<Address>(address, ['street', 'city'])
console.log(cryptoAddress3)
// { 
//   street: 'erblfebrfluierlwuhlrl738743bdwd',
//   number: 123,
//   state: 'NY',
//   city: 'lenkwndekuw8'
// }
```