import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";


const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet() ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <a className="hide-800" href="/#link1">
            Link 1
          </a>
          <a className="hide-800" href="/#link2">
            Link 2
          </a>
          <a className="hide-800" href="/#link3">
            Link 3
          </a>
          <a className="hide-800" href="/#link4">
            Link 4
          </a>
          <div className="social-icons hide-800">
            <img className="nav-social" src="/icons/twitter.svg" alt="" />
            <img className="nav-social" src="/icons/discord.svg" alt="" />
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
          <header className="card" id="link1">
            <div style={{ padding: "0 24px 0 24px 0" }}>
              <h3 className="text-secondary-color">Welcome To</h3>
              <h1 className="pb-3">THE SMOKY APE BASEMENT CLUB</h1>
              <p className="text-secondary-color">
              Smokey Ape Basement Club(SABC) is a collection of 3,333 NFT’s hosted on the Solana blockchain.
              </p>
            </div>
            <div>
              <ThemeProvider theme={theme}>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>
                      
                        <Minter
                          candyMachineId={candyMachineId}
                          
                          connection={connection}
                          startDate={startDateSeed}
                          txTimeout={txTimeout}
                          rpcHost={rpcHost}
                        />
                      
                    </WalletDialogProvider>
                  </WalletProvider>
                </ConnectionProvider>
              </ThemeProvider>
            </div>
          </header>

         
          
          <div id="link4" className="container faq">
            <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
            <div>
              <h4>What will the price be?</h4>
              <p>
                - The 1st presale will be 0.77 SOL<br>
                - The 2nd presale will be 0.88 SOL<br>
                - The public sale will be 1 SOL
              </p>

              <hr />
            </div>

            <div>
              <h4>When does the mint button open?</h4>
              <p>
              The mint site will open 4 times, for 1 hour each time.
Please pick the one that suits you.<br>
- 5 AM 8th Jan UTC<br>
- 1 PM 8th Jan UTC<br>
- 6 PM 8th Jan UTC<br>
- 9 PM 8th Jan UTC
              </p>

              <hr />
            </div>

          

              <hr />
            </div>
          </div>
      </div>
    </div>
  );
};

export default App;
