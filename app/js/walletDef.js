module.exports = {
  getContract: function (_web3) {
    return _web3.eth.contract(walletAbi);
  },
  getInstance: function (_web3, address) {
    return this.getContract(_web3).at(address);
  },
};

var walletAbi = 
[
  {
    "constant": false,
    "inputs": [],
    "name": "nameRegAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "spend",
    "outputs": [],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "oracleAddress",
        "type": "address"
      }
    ],
    "name": "setOracle",
    "outputs": [],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "bytes32"
      }
    ],
    "name": "named",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_phone",
        "type": "string"
      }
    ],
    "name": "setPhone",
    "outputs": [],
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "text",
        "type": "string"
      }
    ],
    "name": "Feedback",
    "type": "event"
  }
]
;