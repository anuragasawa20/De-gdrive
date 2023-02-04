import Upload from './artifacts/contracts/Upload.sol/Upload.json';
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from './Components/FileUpload';
import Display from './Components/Display';
import Modal from './Components/Modal';
import './App.css';

function App() {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);

  useEffect(() => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(contractAddress, Upload.abi, signer)
        //  console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Please connect to your metamask");
      }
    };
    provider && loadProvider()
  }, []);

  return (

    <>
      {!ModalOpen && (<button className='share' onClick={() => setModalOpen(true)}>Share</button>)}
      {ModalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
      <div className="App">
        <h1 style={{ color: "white" }}>google drive 3.0</h1>
        <div class="bg"></div>
        <div class="bg1"></div>
        <div class="bg3"></div>
        <p style={{ color: "white" }}>Account: {account}</p>
        <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
        <Display account={account} contract={contract}></Display>
      </div >
    </>

  );
}

export default App;
