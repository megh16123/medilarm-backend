const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("hello");
});
router.post("/add", (req, res) => {});
router.post("/edit", (req, res) => {});
router.post("/delete", (req, res) => {});

module.exports = router;
