### Use case
https://github.com/liorsaar1/ether-out-of-band/wiki/Out-of-Band-notification-on-Ethereum

### Installation for ether.camp IDE
1. Open dapp/contracts/OutOfBand.sol and 'Run Active Contract'
1. Copy the sandbox id
1. In a terminal
   * ```cd ~/workspace/app```
   * ```node js/webserver.js $SANDBOXID$```
1. In a browser, open http://out-of-band.on.ether.camp:8080/

### Demo
1. Make sure the Sandbox is connected, and the sandbox id, is the one used in the installation.
1. Get Ether - check that the balance updates
1. Set a phone number - must be a US local number:  +1dddddddddd 
1. Click 'Spend'
  * The phone should get an SMS with the spend amount
  * on the phone, SMS back a "YES"
  * The spend is approved and the balances update
1. Click 'Spend'
  * The phone should get an SMS with the spend amount
  * on the phone, SMS back a "LOCK"
  * A 'Wallet Locked' warning is displayed, balance unchanged
  * The wallet should be locked now.
1. Click 'Spend'
  * A 'Wallet Locked' warning is displayed, balance unchanged
1. Click 'Unlock'
  * A 'Wallet Unlocked' message is displayed, Spend is enabled again
  
  
