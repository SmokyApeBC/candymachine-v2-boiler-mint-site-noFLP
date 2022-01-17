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
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet()],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button" >
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="https://smokyapebasementclub.com/wp-content/uploads/2022/01/logo.png" alt="" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              MINT
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="/#link3" onClick={toggleMenu}>
            ANNOUNCEMENT
            </a>
          </li>
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              FAQ
            </a>
          </li>
          <li>
            <div className="social-icons">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="https://smokyapebasementclub.com/wp-content/uploads/2022/01/logo.png" alt="" />
          <a className="hide-800" href="/#link1">
            MINT
          </a>
          <a className="hide-800" href="/#link2">
            ABOUT
          </a>
          <a className="hide-800" href="/#link3">
            ANNOUNCEMENT
          </a>
          <a className="hide-800" href="/#link4">
            FAQ
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
              Mint price
              - 0.88 SOL for the 2nd presale
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

        <div id="link2" className="container">
          Smokey Ape Basement Club(SABC) is a collection of 3,333 NFT’s hosted on the Solana blockchain.
            Each SABC NFT Holder Will be Airdroped a "ZIPPO", of three different categories (Diamond, Gold, Silver) This gives you the benefits of the GEN2 project.
              In a house on a narrow back road, the Apes are secretly gathering in a basement, making a big plan while playing poker.
                Join the club and get the key to the next big plan and turn the World Upside Down.
              </div>

              <div id="link3" className="container card">
                <h1 className="pb-3">"🚨Make sure you connected a wallet that contains SPL-TOKEN🚨"</h1>
              </div>

              <div id="link4" className="container faq">
                <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
                <div>
                  <h4>How many will there be?</h4>
                  <p>
                  There will only be 3,333 Smoky Apes.
                  </p>

                  <hr />
                </div>

                <div>
                  <h4>What will the price be?</h4>
                  <p>
                  The second presale will be 0.88 SOL.
                  </p>

                  <hr />
                </div>

                <div>
                  <h4>How many can you mint per wallet?</h4>
                  <p>
                  You will be able to mint 1 Apes per wallet at each presale.
                  </p>

                  <hr />
                </div>
              </div>
            </div>
        </div>
        );
};

        export default App;
