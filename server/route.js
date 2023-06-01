const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("kuku");
});

module.exports = router;
