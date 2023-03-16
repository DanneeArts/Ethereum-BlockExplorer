import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AllBlocks from './pages/AllBlocks';
import Transactionlist from './pages/Transactionlist';
import TransactionReciept from './pages/TransactionReceipt';
import Block from './pages/Block';
import Address from './pages/Address';
import TotalBlockTxn from './pages/TotalBlockTxn';
import { SearchProvider } from './Context/SearchProvider';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface


function App() {
  return (
    <SearchProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/AllBlocks" element={<AllBlocks />} />
        <Route exact path="/Transactionlist" element={<Transactionlist />} />
        <Route exact path="/TransactionReciept/:id" element={<TransactionReciept />} />
        <Route exact path="/Block/:id" element={<Block />} />
        <Route exact path="/Address/:id" element={<Address />} />
        <Route exact path="/TotalBlockTxn/:id" element={<TotalBlockTxn />} />
      </Routes>
    </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
