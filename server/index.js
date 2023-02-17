const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '143df3d1f9620cd8c06c8a35a3874f0d46a805a2c1133cf507a9b21c0c373e53';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof } = req.body;
  console.log(req.body)

  // Verify the proof against the Merkle root
  const verified = verifyProof(proof, name, MERKLE_ROOT);
  console.log(verified)

  if (verified) {
    res.send('You got a toy robot!');
  } else {
    res.send('You are not on the list :(');
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
