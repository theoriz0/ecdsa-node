import Wallet from "./Wallet";
import Transfer from "./Transfer";
import GenSignature from "./GenSignature"
import "./App.scss";
import { useState } from "react";

function App() {
  const [signature, setSignature] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="app">
      <Wallet />
      <GenSignature setTransSignature={setSignature}
       setTransMessage={setMessage}/>
      <Transfer message={message} setMessage={setMessage} signature={signature} setSignature={setSignature}/>
    </div>
  );
}

export default App;
