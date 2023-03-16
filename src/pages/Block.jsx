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



const Block = () => {

    const [loading, setLoading] = useState(true);
    const [block, setBlock] = useState();
    const { id } = useParams();



    useEffect(() => {
        async function fetchData() {
            const block = await alchemy.core.getBlock(parseInt(id));
            setBlock(block);          
            
      
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
                <h2 class="marginsR">Block: { id }</h2>        
                <div class="rowT marginsR">
                    <button class="but">Overview</button>
                    <button class="but">Consensus Info</button>
                    <button class="but">Comment</button>                  
                </div>
                <div class="BlockR">
                    <div class="row">
                        <div class="TcolL">Block Number:</div>
                        <div class="TcolR">
                                <Link to={`/Block/${block.number}`}>
                                    {block.number}
                                </Link>
                            </div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Parent Hash:</div>
                        <div class="TcolR">{block.parentHash}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Block Hash:</div>
                        <div class="TcolR">{block.hash}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Timestamp:</div>
                        <div class="TcolR">{block.timestamp}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Nonce</div>
                        <div class="TcolR">{parseInt(block.nonce)}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Difficulty</div>
                        <div class="TcolR">{block.difficulty}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Gas Limit:</div>
                        <div class="TcolR">{parseInt(block.gasLimit._hex)}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Gas Used:</div>
                        <div class="TcolR">{parseInt(block.gasUsed._hex)}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Miner:</div>
                        <div class="TcolR"><Link to={`/Address/${block.miner}`}>{block.miner}</Link></div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Extra Data:</div>
                        <div class="TcolR">{block.extraData}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">No. of Transactions:</div>
                        <div class="TcolR">{block.transactions.length}</div>
                    </div>
                    <div class="row">
                        <div class="TcolL">Base Fee Per Gas:</div>
                        <div class="TcolR">{parseInt(block.baseFeePerGas._hex)}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Block;