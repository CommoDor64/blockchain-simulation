class Block {
	constructor(blockHash, prevBlockHash, nonce, blockTransactions) {
		this.blockHash = blockHash
		this.prevBlockHash = prevBlockHash
		this.nonce = nonce
		this.blockTransactions = blockTransactions
	}
	
	getBlockHash() { this.blockHash }
	getPrevBlockHash() { this.prevBlockHash }
	getNonce() { this.nonce } 
	getBlockTransactions() { this.blockTransactions }
}

module.exports = Block