var express = require('express');
var router = express.Router();
var Controller = require('../controllers/Controller');
var controller = new Controller();
/* GET home page. */
router.get('/', (req, res, next) => controller.index(req, res, next));
router.post('/init', (req, res, next) => controller.update(req, res, next));

module.exports = router;
