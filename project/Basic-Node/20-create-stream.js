//STREAMS are 
//Writeable --> means we can wrtie data
//Readable --> means we can read data
//Duplex --> means we either read or write data or do both
//Transform --> we can transform data

// const { writeFile, writeFileSync } = require('fs');
// for(let i = 0 ; i < 1000; i++) {
//     writeFileSync('./content/big.txt',`hello world ${i}\n`, { flag: 'a'})
// }

//Using the stream 

const { createReadStream } = require('fs');

const stream = createReadStream('./content/big.txt', {highWaterMark: 90000, encoding: 'utf-8'});

stream.on('data', (result)  => {
    console.log(result);
})

stream.on('error', (err) => {
    console.log(err)
})

//By default the size of the buffer is 64kb
//last buffer - remainder
//highWaterMark - control size
//const stream = createReadStream('./content/big/txt', {highWaterMark: 90000})
//const stream = createReadStream('../content/big.txt, { encoding: 'utf8 })
