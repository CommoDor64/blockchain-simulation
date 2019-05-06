var express = require('express');
var router = express.Router();
var Controller = require('../controllers/Controller');
var controller = new Controller();
var initValidationMiddleware = require('../middlewares/initValidation');
var balanceValidationMiddleware = require('../middlewares/balanceValidation'); 
//middleware
router.get('/', (req, res, next) => controller.index(req, res, next));
router.get('/balance/:id', (req, res, next) => balanceValidationMiddleware(req, res, next), (req, res, next) => controller.balance(req, res, next))
router.post('/init',(req, res, next) => initValidationMiddleware(req, res, next) ,(req, res, next) => controller.init(req, res, next));


module.exports = router;
