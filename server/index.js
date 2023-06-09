const express = require("express");
const app = express();
const cors = require("cors");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03a34c0ce9c6c2b90dedfc3155199f010b74a1286b6357973f42a01acfce0b1448": 100, // private: 976e51e1f70d61134efbb917a5484b7591527e49811ef83a685b36d203467136
  "034be461d2b9c412338209be566bb208971ea92e3cdf98aab44b6d8781306beb8a": 50, // private: 0602971533fac4765f70fd6bd7296a6c9c1d8ebabe4b8c369ba27ee86d3353d6
  "03e3f657c0732f66520b4d9585ef2be1f977220b484ec775fd2cc1885070440197": 75, // private: 1e1e58174fc003213203902b19ae70c80332958207120d0ed2c48cc465fbc5bc
};

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}


const transactions = []

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, message } = req.body;

  // check if signature is used.
  if (transactions.includes(signature)) {
    res.status(400).send({ message: "Signature has been used, please re-generate." });
    return
  } else {
    transactions.push(signature);
  }

  // get and verify public key from signature.
  const signatureObj = secp256k1.Signature.fromCompact(signature);
  signatureObj.recovery = 0;
  // console.log(signatureObj);
  const msgH = hashMessage(message);
  const sender = signatureObj.recoverPublicKey(msgH).toHex();
  const isValid = secp256k1.verify(signature, msgH, sender);

  if (!isValid) {
    res.status(400).send({ message: "Invalid signature!" });
    return
  }
  
  const messageObj = JSON.parse(message);
  const timestamp = messageObj.timestamp;
  // check if timestamp is valid
  if (timestamp > (new Date()).getTime()) {
    res.status(400).send({ message: "Signature timestamp exceeds current time." });
    return
  }
  const recipient = messageObj.recipient;
  const amount = messageObj.amount;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.status(200).send();
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
