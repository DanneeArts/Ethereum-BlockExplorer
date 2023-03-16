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



const TransactionReciept = () => {

    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [transaction, setTransaction] = useState();
    const [block, setBlock] = useState();



    useEffect(() => {
        async function fetchData() {            
            const transaction = await alchemy.core.getTransactionReceipt(id);
            setTransaction(transaction);      
            
            const block = await alchemy.core.getBlockWithTransactions(transaction.blockNumber);
            setBlock(block);
            console.log(block);
      
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
        <div class="TransactionReciept">
            <Header />   
            <div>         
                <h2 class="marginsR">Transaction Details</h2>        
                <div class="rowT marginsR">
                    <button class="but">Overview</button>
                    <button class="but">Internal Transactions</button>
                    <button class="but">State</button>
                    <button class="but">Comment</button>                  
                </div>
                <div class="receipt">
                    <div class="row">
                        <div class="TcolL">Transaction Hash:</div>
                        <div class="TcolR">{transaction.transactionHash}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Type:</div>
                        <div class="TcolR">{transaction.type}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Status:</div>
                        <div class="TcolR">{transaction.status}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Block Number:</div>
                        <div class="TcolR">
                            <Link to={`/Block/${transaction.blockNumber}`}>
                                    {transaction.blockNumber}
                                </Link>
                        </div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Block Hash:</div>
                        <div class="TcolR">{transaction.blockHash}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Confirmations:</div>
                        <div class="TcolR">{transaction.confirmations}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">From:</div>
                        <div class="TcolR">{transaction.from}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">To:</div>
                        <div class="TcolR">{transaction.to}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Gas Used:</div>
                        <div class="TcolR">{parseInt(transaction.gasUsed._hex)}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Transaction Index:</div>
                        <div class="TcolR">{transaction.transactionIndex}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Cummultative Gas Used:</div>
                        <div class="TcolR">{parseInt(transaction.cumulativeGasUsed._hex)}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Nonce:</div>
                        <div class="TcolR">{parseInt(block.nonce)}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Effective Gas Price:</div>
                        <div class="TcolR">{parseInt(transaction.effectiveGasPrice._hex)}</div>
                    </div>
                    {/* <div class="row">
                        <div class="TcolL">s:</div>
                        <div class="TcolR">ddd</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">v:</div>
                        <div class="TcolR">ddd</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Data:</div>
                        <div class="TcolR">ddd</div>
                    </div> */}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TransactionReciept