const express = require("express");
const { createTask, getTasks } = require("../controllers/task.controller");
const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);

module.exports = router;
