const express = require("express");
const { receiveData } = require("../controllers/data.controller");
const router = express.Router();

router.post("/", receiveData);

module.exports = router;
