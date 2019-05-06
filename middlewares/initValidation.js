var _ = require("lodash");

function validation(req, res, next) {
  if (_.isEmpty(req.body))
    res.status(400).json({ message: "must include body", code: 400 });
  const { balances, transactions, blockSize } = req.body;
  if (balances && transactions && blockSize) {
    if (!balances.length)
      res.status(400).json({
          messge: "balances must be in following format: [<Integer>,...]"
        });
    else if (!transactions.length)
      res
        .status(400).json({
					messge: "transaction must be in following format: [[<sender: Integer>,<recepient: Integer>,<amount: Integer>],...]",
          code: 400
        });
    else if (!blockSize)
      res.status(400).json({ 
					messge: "blockSize must be in following format: <Integer>",
          code: 400
        });
    for (let tx of transactions) {
      if (tx[0] < transactions.length && tx[1] < transactions.length) continue;
			res.json(400).json({ message: "user balance does not exist", code: 400 });
			return;
    }
    next();
  }
  else 
    res.status(400).json({
      message: "balance, transaction and blocksize cant be empty",
      code: 400
    });
}

module.exports = validation;