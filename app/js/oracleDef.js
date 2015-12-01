module.exports = {
  getContract: function (_web3) {
    return _web3.eth.contract(oracleAbi);
  },
  getInstance: function (_web3, address) {
    return this.getContract(_web3).at(address);
  },
};

var oracleAbi = 
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
        "name": "phone",
        "type": "string"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "confirmed",
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
        "name": "phone",
        "type": "string"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "notify",
    "outputs": [],
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "phone",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Notify",
    "type": "event"
  }
]