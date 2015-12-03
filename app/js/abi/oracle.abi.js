function oracleAbi() { 
    var abi = 
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
        "name": "phone",
        "type": "string"
      }
    ],
    "name": "lock",
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
;return abi;
}
