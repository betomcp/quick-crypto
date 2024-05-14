# Easy Crypto
### An easy way to cipher and decipher messages with TypeScript.
With this library, you can easily encrypt both complex objects and simple values.

## Instalation
``npm install nome-da-lib``


## Build
`npm run build`

## Test
`npm run test`

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
- getDefauktKeyAndIv(): { key: string, iv?: string }
```

# cipherObject

This method is used to easly crptograph any object properties.
Below there is an example of how this method works.


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