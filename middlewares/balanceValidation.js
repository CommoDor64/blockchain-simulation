function validation(req, res, next) {
	if(!req.params)
		res.status(400).json({message:"must provide account id", code:400});
	next()
}

module.exports = validation;
