
const { Alchemy, Network } = require('alchemy-sdk');

const settings = {
    apiKey: 'z7qfXKjkYzw3kivQJc1IdeMhtKXci2Kn',
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);

async function main({input}) {

  //const input = '0x3ca53ee4546c813c1570fe2c6e2055c00a618d2097ea6e4ea4653f074bb1f846';
  
  if(!input.startsWith('0x')){
    
    const number = parseInt(input)
    console.log(typeof number)
    console.log("this is a block number")
    return
  }
  if(input.startsWith('0x') && input.length === 42){
    
    console.log('this is an address')
    return
  }
  if(input.startsWith('0x') && input.length === 66) {
    
    console.log('this is a txn hash')
  }
        
        
}
      main();
      
      
      
//     console.log(gasPriceNumber);


