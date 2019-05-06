var BlockchainController = require("../models/Blockchain");

class Controller {
  constructor() {
    this.blockchainController = null;
  }
  index(req, res, next) {
    if (this.blockchainController)
      res.status(200).json({data:this.blockchainController.getBlockchain(), code: 200});
    else res.status(200).json({ message:"blockchain is empty", code: 200 });
  }

  update(req, res, next) {
    const { balances, transactions, blockSize } = req.body;
    this.blockchainController = new BlockchainController();
    this.blockchainController.init(balances, transactions, blockSize);
    res.status(200).send({ message: "blockchain is set", code: 200 });
  }
}

module.exports = Controller;
