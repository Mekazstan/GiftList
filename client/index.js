const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();  
  console.log("Root", root)

  // Generate a proof that the current child is on the nice list
  const index = niceList.indexOf('Norman Block');
  if (index < 0) {
    console.error('You are not on the nice list!');
    return;
  }
  console.log('Good to go...')
  const proof = merkleTree.getProof(index);

  // Send the gift request to the server with the proof to verify proof and send/ not send gift
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: 'Norman Block',
    proof: proof
  });

  console.log({ gift });
}

main();
