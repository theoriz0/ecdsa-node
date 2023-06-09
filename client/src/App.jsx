import Wallet from "./Wallet";
import Transfer from "./Transfer";
import GenSignature from "./GenSignature"
import "./App.scss";
import { useState } from "react";

function App() {
  const [signature, setSignature] = useState("");
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [timestamp, setTimestamp] = useState("");

  return (
    <div className="app">
      <Wallet />
      <GenSignature setTransSignature={setSignature}
       setTransAmount={setAmount} setTransRecipient={setRecipient}
       setTransTimestamp={setTimestamp}/>
      <Transfer recipient={recipient} setRecipient={setRecipient} amount={amount} setAmount={setAmount}
       timestamp={timestamp} setTimestamp={setTimestamp} signature={signature} setSignature={setSignature}/>
    </div>
  );
}

export default App;
