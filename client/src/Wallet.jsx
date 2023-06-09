import server from "./server";
import { useState } from "react";

function Wallet() {

  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onClick(evt) {
    evt.preventDefault();
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Wallet Balance</h1>

      <label>
        Wallet Address
        <input id="address" placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <input type="button" className="button" value="Refresh" onClick={onClick}/>
    </div>
  );
}

export default Wallet;
