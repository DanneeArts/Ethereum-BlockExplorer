import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"

const { Alchemy, Network } = require('alchemy-sdk');
const web3 = new Web3(process.env.REACT_APP_INFURA_API_KEY);

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);



const Address = () => {

    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [balance, setBalance] = useState(null);
    const [txnList, setTxnList] = useState([]);
   



    useEffect(() => {
        async function fetchData() {            
            
          const balance = await web3.eth.getBalance(id);
          setBalance(balance);
          console.log(balance);

          const data = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: id,
            category: ["external", "internal", "erc20"],
          });
          const txnList = data.transfers.slice(0,20);
          setTxnList(txnList);

            setLoading(false);
          }
      
          fetchData();
        }, [id]);
            
      if (loading) {
        return (
          <div class="parentload">
            <div class="loader"></div>
          </div>
        );
      }

    
    return (
        <div class="Address">
            <Header />   
            <div>         
              <div class="list-containerA">
                    <div class="Taddress1">
                      <div class="marginsR">
                        <h2>Overview</h2>
                      </div>
                      <div class="marginsR">
                        ETH BALANCE: <br /> {web3.utils.fromWei(balance, 'ether')}
                      </div>
                    </div>
                    <div class="Taddress2">
                      <div class="marginsR">
                        <h2>More Info</h2>
                      </div>
                      <div class="marginsR paddis">
                        LAST TXN SENT <br /> <Link to={`/TransactionReciept/${txnList[0].hash}`}>{txnList[0].hash.slice(0,18) + '...'}</Link>
                      </div>
                      <div class="marginsR">
                        FIRST TXN SENT <br /> 0000000
                      </div>
                    </div>
              </div>
              <div class="tablelistA">
                        <div></div>
                  <div class="row rowcolor">
                    <div class="col colcolor">Txn Hash</div>
                    <div class="col colcolor">Unique ID</div>
                    <div class="col colcolor">From</div>
                    <div class="col colcolor">To</div>
                    <div class="col colcolor">Value</div>
                    <div class="col colcolor">Asset</div>
                    <div class="col colcolor">Category</div>                            
                    
                  </div> 
                  
                  {(txnList.map((txn, i) => {
                      return (
                        <div class="row ">
                          <div class="col ">
                            <Link to={`/TransactionReciept/${txn.hash}`}>
                            {txn.hash.slice(0,13) + '...'}
                            </Link>
                            </div>
                            
                          <div class="col ">{txn.uniqueId.slice(0,13) + '...'}</div>
                          <div class="col ">{txn.from.slice(0,13) + '...'}</div>
                          <div class="col ">
                          <Link to={`/Address/${txn.to}`}>{txn.to.slice(0,13) + '...'}</Link></div>
                          <div class="col ">{parseFloat(txn.value).toFixed(3)}</div>
                          <div class="col ">{txn.asset}</div>
                          <div class="col ">{txn.category}</div>                            
                          
                        </div> 
                    )
                  }))}
                  <div class="firstandlastrow lastr"></div>                     
              </div>

              
            </div>
            <Footer />
        </div>
    )
}

export default Address