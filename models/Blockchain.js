var sha1 = require("sha1");
var Block = require("./Block");
var _ = require("lodash");

class BlockchainController {
  constructor() {
    this.balances;
    this.transactions;
    this.blockSize;
    this.allTransactionsValid;
  }
  init(initialBalances, transactions, blockSize) {
    // set genesis block and blockchain hash map
    const genesis = new Block("000000000000000000", null, 35688, []);
    this.blockchain = new Map();
    this.blockchain.set(0, genesis);
    this.blockchainHead = 0;
    // set initial data
    this.balances = initialBalances;
    this.transactions = transactions;
    this.blockSize = blockSize;
    this.allTransactionsValid = this.handleTxs();
  }

  getAccountBalances(id) {
    if (id < this.balances.length) return this.balances[id];
    else throw new Error("User does not exist");
  }

  validateTx(tx) {
    const sender = tx[0];
    const amount = tx[2];
    if (Number(this.balances[sender]) < Number(amount)) return false;
    return true;
  }
  handleTx(tx) {
    const sender = tx[0];
    const recipient = tx[1];
    const amount = tx[2];
    this.balances[sender] -= amount;
    this.balances[recipient] += amount;
  }
  handleTxs() {
    do {
      // section A checks if there are new transactions to mine
      let oldLength = this.transactions.length;
      let validTransactions = [];
      let invalidTransactions = [];
      for (let tx of this.transactions) {
        let isValid = this.validateTx(tx);
        if (isValid && validTransactions.length < this.blockSize) {
          this.handleTx(tx);
          validTransactions.push(tx);
        } else {
          invalidTransactions.push(tx);
        }
      }
      this.transactions = invalidTransactions;
      // section B bundles the vaild transaction, mines and puts in blockchain
      let { nonce, hash } = mine(
        this.blockchainHead,
        validTransactions.toString(),
        "1234"
      );
      let newBlock = new Block(
        hash,
        this.blockchainHead,
        nonce,
        validTransactions
      );
      this.blockchain.set(hash, newBlock);
      this.blockchainHead = hash;
      let length = this.transactions.length;
      // section C checks if there are any more potentially valid transactions to mine
      // if there are invalid transaction, the functions returns false
      if (oldLength === length) return false;
    } while (this.transactions.length != 0);
    return true;
  }
  getBlockchain() {
    var blockchain = [];
    var head = this.blockchainHead;
    do {
      blockchain.push(this.blockchain.get(head));
      head = this.blockchain.get(head).prevBlockHash;
    } while(head); 
    blockchain.push(this.blockchain.get(head));
    return blockchain;
  }
  printBlockchain() {
    console.log(this.getBlockchain());
  }
}

function mine(prevBlockHash, blockTransactions, target) {
  let nonce = -1;
  do {
    nonce++;
    var payload = prevBlockHash + nonce.toString() + blockTransactions;
    var hash = sha1(payload);
  } while (hash.slice(0, 4) != target);
  return { nonce, hash };
}

module.exports = BlockchainController;
