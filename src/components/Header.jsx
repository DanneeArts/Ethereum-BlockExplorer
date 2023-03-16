import { Link } from "react-router-dom";

const Header = () => {

    function dropDownFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }
      
    return (
        <div>
            <div class="Header1 borders">
                <p class="marginsR">ETH Price: $1,552.42 (+0.08%)</p>
                <p> Gas: 56 Gwei</p>
                <div class="logoright">
                    <img src="../ethlogo.png" class="mainlogo"/>
                </div>                
            </div>
            <div class="Header1">
                <div class="Headerleft">
                    <img src="../ethlogo.png" class="component marginsR mainlogo"/>
                    <h2 class="component"><Link to={`/`}>Ethersplorer</Link></h2>
                </div>
                <div class="Headerright">
                    <button class="dropdown dropbtn white"><Link to={`/`}>Home</Link></button>
                    <div class="dropdown">
                        <button onclick={dropDownFunction} class="dropbtn">Blockchain</button>
                        <div id="myDropdown" class="dropdown-content">
                            <Link to='/Transactionlist'>Transactions</Link>
                            <Link to='/AllBlocks'>Blocks</Link>
                            <a href="#">Uncles</a>
                        </div>
                    </div>

                    <div class="dropdown">
                        <button onclick={dropDownFunction} class="dropbtn">Tokens</button>
                        <div id="myDropdown" class="dropdown-content">
                            <a href="#">Top Tokens</a>
                            <a href="#">Token Transfer</a>
                        </div>
                    </div>

                    <div class="dropdown">
                        <button onclick={dropDownFunction} class="dropbtn">NFTs</button>
                        <div id="myDropdown" class="dropdown-content">
                            <a href="#">Top NFTs</a>
                            <a href="#">Latest Trades</a>
                            <a href="#">Latest Transfers</a>
                            <a href="#">Latest Mints</a>
                        </div>
                    </div>

                    <div class="dropdown">
                        <button onclick={dropDownFunction} class="dropbtn">Resources</button>
                        <div id="myDropdown" class="dropdown-content">
                            <a href="#">Top NFTs</a>
                            <a href="#">Latest Trades</a>
                            <a href="#">Latest Transfers</a>
                            <a href="#">Latest Mints</a>
                        </div>
                    </div>

                    <div class="dropdown">
                        <button onclick={dropDownFunction} class="dropbtn">Resources</button>
                        <div id="myDropdown" class="dropdown-content">
                            <a href="#">Charts and Statistics</a>
                            <a href="#">Top Statistics</a>
                            <a href="#">Directory</a>
                            <a href="#">Newsletter</a>
                            <a href="#">Knowledge Base</a>
                        </div>
                    </div>

                    <div class="dropdown">
                        <button onclick={dropDownFunction} class="dropbtn">Developers</button>
                        <div id="myDropdown" class="dropdown-content">
                            <a href="#">API plans</a>
                            <a href="#">API documentation</a>
                            <a href="#">Verify Contract</a>
                            <a href="#">Smart Contract Search</a>
                            <a href="#">Contract Diff Checker</a>
                            <a href="#">Vyper Online Compiler</a>
                            <a href="#">Byte to Opcode</a>
                            <a href="#">Broadcast Transaction</a>
                        </div>
                    </div>

                </div>                
            </div>
        </div>
    )
}

export default Header