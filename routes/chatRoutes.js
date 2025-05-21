const express = require("express");
const router = express.Router();
const {sendResponse} = require('../controller/chatAi');

router.post('/', sendResponse);

module.exports = router;