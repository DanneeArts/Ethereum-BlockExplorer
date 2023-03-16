import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const { Alchemy, Network } = require('alchemy-sdk');




const web3 = new Web3(process.env.REACT_APP_INFURA_API_KEY);

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);



const Transactionlist = () => {

    const [loading, setLoading] = useState(true);   
    const [latestBlocks, setLatestBlocks] = useState(null);


    useEffect(() => {
        async function fetchData() {
            
            const blockNumber = await alchemy.core.getBlockNumber();   
            
            const latestBlocks = await Promise.all(
                [...Array(50)].map((_, i) => alchemy.core.getBlock(blockNumber - i))
              );
              console.log(latestBlocks)
              setLatestBlocks(latestBlocks);
              
            
      
            setLoading(false);
          }
      
          fetchData();
        }, []);
            
      if (loading) {
        return (
          <div class="parentload">
            <div class="loader"></div>
          </div>
        );
      }

    return (
        <div class="Transactionlist">
            <Header/>
            <div>
                <h2 class="marginsR">Blocks</h2>
                <div>
                    <div>
                         
                    </div>
                    <div class="tablelist">
                        <div></div>
                        <div class="row rowcolor">
                        <   div class="col colcolor">Block Number</div>
                            <div class="col colcolor">Block Hash</div>
                            <div class="col colcolor">Parent Hash</div>
                            <div class="col colcolor">Txn</div>
                            <div class="col colcolor">Miner</div>
                            <div class="col colcolor">Gas Used</div>
                            <div class="col colcolor">Base Fee</div>                            
                            <div class="col colcolor">Timestamp</div>
                        </div>

                        {(latestBlocks.map((blocks, i) => {
                                return (
                                    <div class="row">
                                        <div class="col"><Link to={`/Block/${blocks.number}`}>{blocks.number}</Link></div>
                                        <div class="col">{blocks.hash.slice(0,13) + '...'}</div>
                                        <div class="col">{blocks.parentHash.slice(0,13) + '...'}</div>
                                        <div class="col">{blocks.transactions.length}</div>
                                        <div class="col"><Link to={`/Address/${blocks.miner}`}>{blocks.miner.slice(0,13) + '...'}</Link></div>
                                        <div class="col">{parseInt(blocks.gasUsed._hex)}</div>
                                        <div class="col">{parseFloat(web3.utils.fromWei(blocks.baseFeePerGas._hex, 'gwei')).toFixed(4)} Gwei</div>                                        
                                        <div class="col">{blocks.timestamp}</div>                                        
                                    </div>
                                    )
                                }))}
                        <div class="firstandlastrow lastr"></div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Transactionlist;