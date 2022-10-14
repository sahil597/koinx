const router = require("express").Router();
const controllers = require('../controllers');
/*
On-Boarding
*/
router.get("/transactions/:address", controllers.user.getTransactions);
router.get("/balance/:address", controllers.user.getBalance);
module.exports = router;