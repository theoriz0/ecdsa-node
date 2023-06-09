import { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
}

function GenSignature({ setTransSignature, setTransMessage }) {

    const [signature, setSignature] = useState("");
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [privateKey, setPrivateKey] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    const genSignature = async (evt) => {
        evt.preventDefault();
        const now = (new Date()).getTime()
        setTimestamp(now);
        const message = {};
        message.timestamp = now;
        message.recipient = recipient;
        message.amount = parseInt(amount);
        const messageJSONStr = JSON.stringify(message);
        const hashedMessage = hashMessage(messageJSONStr);
        // whether the recovered bit should be included in the result.
        const signature = secp256k1.sign(hashedMessage, privateKey);
        console.log(signature);
        const sigH = signature.toCompactHex()
        // const recoveredSig = secp256k1.Signature.fromCompact(sigH);
        // console.log(recoveredSig);
        setSignature(sigH);
        setTransMessage(messageJSONStr);
        setTransSignature(sigH);
    }

    return (
        <div className="container genSig">
            <h1>Generate Signature (Local)</h1>
            <p>At local, no interact with server.</p>
            <form onSubmit={genSignature}>
                <label>
                    Recipient
                    <input placeholder="Type an address, for example: 0x1" value={recipient} onChange={setValue(setRecipient)}></input>
                </label>
                <label>
                    Send Amount
                    <input placeholder="0, 1 ,2..." value={amount} onChange={setValue(setAmount)}></input>
                </label>
                <label>
                    Private Key
                    <input placeholder="" value={privateKey} onChange={setValue(setPrivateKey)}></input>
                </label>
                <input type="submit" className="button" value="Generate" />
            </form>

            <div className="balance">Timestamp: {timestamp}</div>
            <div className="balance">Signature: {signature}</div>
        </div>
    );
}

export default GenSignature;
