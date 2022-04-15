<template>
    <h3>Connect Wallet</h3>
    <div v-if="!currentAccount">
      <button class="primaryButton" @click="connectWallet">Connect Wallet</button>
    </div>
    <div v-if="!currentContract">
       <button class="primaryButton" @click="attachContract">Attach Contract</button>
    </div>
</template>

<script>
import  {contractABI, contractAddress} from "../Utils/constants.js"
import {ethers} from "ethers"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      currentAccount: null,
      currentContract: null,
      contractAddress: contractAddress,
    }
  },
  mounted() {
    this.checkConnectedWalletExist();
    // this.getAccount();
    // this.getContract();
  },
  methods: {
    checkConnectedWalletExist: async function() {
      try {
        const {ethereum} = window;
        if(!ethereum) {
          alert("Please install MetaMask first!");
          return false;
        } else {
          console.log("we have an ethereum object", ethereum);
        }
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if(accounts.length !== 0 ) {
          const account = accounts[0];
          console.log("Found an authorized account", account);
          this.currentAccount = account;
          return true;
        }else {
          alert("Please login to MetaMask first!");
          return false;
        }
      } catch(error) {
        console.log("error", error);
      }
    },
    connectWallet: async function () {
      try {
        const {ethereum} = window;
        if(!ethereum) {
          alert("Install Metamask first!");
          return;
        }
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        console.log("connected to", accounts[0]);
        this.currentAccount = accounts[0];
      } catch (error) {
        console.log("error", error);
      }
    },
    attachContract: async function () {
        console.log('ghjhjk', this.contractAddress)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const abi = contractABI;
      this.currentContract = new ethers.Contract(this.contractAddress, abi, signer);
      console.log(await this.currentContract.greet())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
