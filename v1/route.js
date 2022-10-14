const express = require('express');
const Routes = require('./routes/');
const router = express();
router.use('/user', Routes.user);
module.exports = router;