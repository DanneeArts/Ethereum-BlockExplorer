import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { SearchContext } from '../Context/SearchProvider';



const { Alchemy, Network } = require('alchemy-sdk');


// const { ethers } = require('ethers');

const web3 = new Web3(process.env.REACT_APP_INFURA_API_KEY);

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);

const Body = () => {
    // const { searchTerm, setSearchTerm} = useContext(SearchContext);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [blockNumber, setBlockNumber] = useState();
    const [blockHash, setBlockHash] = useState(null);
    const [gasLimit, setGasLimit] = useState(null);
    const [parentHash, setParentHash] = useState(null);
    const [gasUsed, setGasUsed] = useState(null);
    const [blockMiner, setBlockMiner] = useState(null);
    const [baseFee, setBaseFee] = useState(null);
    const [latestBlocks, setLatestBlocks] = useState(null);
    const [latestTxns, setLatestTxns] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
   


    useEffect(() => {
        async function fetchData() {
            
            const blockNumber = await alchemy.core.getBlockNumber();
            setBlockNumber(blockNumber);
      
            const block = await alchemy.core.getBlock(blockNumber);
            setBlockHash(block.hash);
            setGasLimit(parseInt(block.gasLimit._hex));
            setParentHash(block.parentHash);
            setGasUsed(parseInt(block.gasUsed._hex));
            setBlockMiner(block.miner);
            setBaseFee(parseInt(block.baseFeePerGas._hex.slice(0, 10)));
      
            const latestBlocks = await Promise.all(
              [0, 1, 2, 3, 4, 5].map(i => alchemy.core.getBlock(blockNumber - i))
            );
            setLatestBlocks(latestBlocks);

            const lastBlock = await alchemy.core.getBlockWithTransactions(blockNumber);
            const txnArray = lastBlock.transactions.slice(0, 6).map(txn => txn);           
            setLatestTxns(txnArray);   
            setLoading(false);
          }
      
          fetchData();
        }, []);

        const Searcher = (e) => {
            e.preventDefault()
           
                const input = searchTerm;
    
                if(!input.startsWith('0x') && input != ''){
                    const number = parseInt(input)
                    navigate(`/block/${number}`)
                  }
    
                else if(input.startsWith('0x') && input.length === 42){
                  navigate(`/Address/${input}`)
                  }
    
                else if(input.startsWith('0x') && input.length === 66) {
                  navigate(`/TransactionReciept/${input}`)
                  }
    
                else {
                  navigate("/")
                }
              }
            
      if (loading) {
        return (
          <div className="parentload">
            <div className="loader"></div>
          </div>
        );
      }

    return (
        <div className="fullbody">
            <div className="container1">
                <div className="body">
                    <h3>The Ethereum Blockchain Explorer</h3>
                    <form onSubmit={Searcher}>
                    <div className="form-container">
                        <select className="bodySelect">
                        <option value="value1">All filters</option>
                        <option value="value1">Address</option>
                        <option value="value2">Txn Hash</option>
                        <option value="value3">Block</option>
                        <option value="value3">Block Hash</option>
                        </select>
                        <input type="" placeholder="Search by Address/Txn hash/Block/Block Hash" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className="buttonSel">Search</button>
                    </div>
                    </form>
                </div>
            </div>

            <div className="container2">
                <div className="list-container">
                    <div className="table1">
                        <div className="tleft">
                            <h3>Block Number:</h3>
                            <h1><Link to={`/Block/${blockNumber}`}>{blockNumber}</Link></h1>
                        </div>
                        <div className="tright">
                            <div className="headlist">Block Information</div>                                               
                            <div className="trow">
                                <div className="col">Block Hash: {blockHash.slice(0,8) + '...'}</div>
                                <div className="col">Gas limit: {gasLimit}</div>
                            </div>
                            <div className="trow">
                                <div className="col">Parent Hash: {parentHash.slice(0,7) + '...'}</div>
                                <div className="col">Gas Used: {gasUsed}</div>
                            </div>
                            <div className="trow">
                                <div className="col">Block Miner: <Link to={`/Address/${blockMiner}`}>{blockMiner.slice(0,7) + '...'}</Link></div>
                                <div className="col">Base Fee: {baseFee}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-container">
                    <div className="table2">
                        <div className="firstandlastrow headlist">Latest Blocks</div>
                        
                            {(latestBlocks.map((block, i) => {
                                return (
                                    <div className="rows">
                                        <div className="col">
                                            <Link to={`/Block/${block.number}`}>
                                                {block.number}
                                            </Link>
                                            </div>
                                        <div className="col">Block Miner:<Link to={`/Address/${block.miner}`}>{block.miner.slice(0,8) + "..."}</Link></div>                            
                                        <div className="col"><Link to={`/TotalBlockTxn/${block.number}`}>{block.transactions.length + " txns"}</Link></div>
                                    </div>
                                )
                            }))}
                           
                        
                    {/* 6 rows */}
                        <div className="firstandlastrow lastr">
                            <Link to='/AllBlocks'>View all Blocks</Link>
                        </div>
                    </div>

                    <div className="table3">
                        <div className="firstandlastrow headlist">Latest Transaction</div>
                        {(latestTxns.map((txn, i) => {
                                return (
                                    <div className="rows">
                                        <div className="col">
                                            <Link to={`/TransactionReciept/${txn.hash}`}>
                                            {txn.hash.slice(0,8) + "..."}
                                            </Link>
                                        </div>
                                        <div className="col">From: <Link to={`/Address/${txn.from}`}>{txn.from.slice(0,8) + "..."}</Link>
                                            <br />
                                            To:<Link to={`/Address/${txn.to}`}>{txn.to.slice(0,8) + "..."}</Link>
                                        </div>                            
                                        <div className="col">{parseFloat(web3.utils.fromWei(txn.value._hex, 'ether')).toFixed(4)} ETH</div>
                                    </div>
                                )
                         }))}
                        {/* 6 rows */}
                        <div className="firstandlastrow lastr">
                            <Link to='/Transactionlist'>View all Transactions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body
