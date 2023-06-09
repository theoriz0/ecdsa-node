import { useState } from "react";
import server from "./server";

function Transfer({ timestamp, setTimestamp, recipient, setRecipient, amount, setAmount, signature, setSignature }) {

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature: signature,
        amount: parseInt(amount),
        recipient,
        timestamp,
      });
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Recipient
        <input
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={amount}
          onChange={setValue(setAmount)}
        ></input>
      </label>

      <label>
        Timestamp
        <input
          value={timestamp}
          type="number"
          onChange={setValue(setTimestamp)}
        ></input>
      </label>

      <label>
        Signature
        <input
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>

      

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
