import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Web3 from 'web3';
import { Link,useParams } from "react-router-dom"
const { Alchemy, Network } = require('alchemy-sdk');

const web3 = new Web3(process.env.REACT_APP_INFURA_API_KEY);

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const TotalBlockTxn = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);  
    const [blockTxns, setLatestTxns] = useState(null); 
  

  useEffect(() => {
    async function fetchData() {
        
        const blockNumber = parseInt(id);
        console.log(blockNumber)
        const lastBlock = await alchemy.core.getBlockWithTransactions(blockNumber);
        const txnArray = lastBlock.transactions.slice(0, 50).map(txn => txn);
        console.log(txnArray)
        setLatestTxns(txnArray);
    
        setLoading(false);
    }
    
    fetchData();
  }, [id]);
  
  if (loading) {
    return (
      <div className="parentload">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="Transactionlist">
      <Header/>
      <div>
        <h3 className="marginsR">Transactions</h3>
        <div>
          <div>
          </div>
          <div className="tablelist">
            <div></div>
            <div className="row rowcolor">
              <div className="col colcolor">Txn Index</div>
              <div className="col colcolor">Txn Hash</div>
              <div className="col colcolor">Type</div>
              <div className="col colcolor">Block Number</div>
              <div className="col colcolor">Block Hash</div>
              <div className="col colcolor">From</div>
              <div className="col colcolor">To</div>                            
              <div className="col colcolor">Amount</div>
            </div>
            {(blockTxns.map((txn, i) => {
                    return (
                        <div class="row">
                            <div class="col">{txn.transactionIndex}</div>
                                        <div class="col">
                                          <Link to={`/TransactionReciept/${txn.hash}`}>
                                              {txn.hash.slice(0,13) + '...'}
                                            </Link>
                                            
                                          </div>
                                        <div class="col">{txn.type}</div>
                                        <div class="col">
                                          <Link to={`/Block/${txn.blockNumber}`}>
                                            {txn.blockNumber}
                                          </Link>                                          
                                        </div>
                                        <div class="col">{txn.blockHash.slice(0,13) + '...'}</div>
                                        <div class="col"><Link to={`/Address/${txn.from}`}>{txn.from.slice(0,13) + '...'}</Link></div>
                                        <div class="col"><Link to={`/Address/${txn.to}`}>{txn.to.slice(0,13) + '...'}</Link></div>                                        
                                        <div class="col">{parseFloat(web3.utils.fromWei(txn.value._hex, 'ether')).toFixed(4)} ETH</div>                                            
                            </div>
                 )
                }))} 
            <div className="firstandlastrow lastr"></div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default TotalBlockTxn;
