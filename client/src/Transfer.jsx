import { useState } from "react";
import server from "./server";

function Transfer({ message, setMessage, signature, setSignature }) {

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const resp = await server.post(`send`, {
        signature: signature,
        message: message,
      });
      alert(resp.statusText);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Message
        <textarea
          value={message}
          onChange={setValue(setMessage)}
          rows="8"
        ></textarea>
      </label>

      <label>
        Signature
        <textarea
          value={signature}
          onChange={setValue(setSignature)}
          rows="8"
        ></textarea>
      </label>



      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
