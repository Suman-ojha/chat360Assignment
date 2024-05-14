const express = require('express');
const router = express.Router();

const logController = require("../controllers/logApi");


router.post("/add-log", logController.insertLog);
router.post("/level", logController.index);


module.exports = router