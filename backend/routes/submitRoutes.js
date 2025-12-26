const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { submitForm } = require("../controllers/submitController");

// POST: submit form + upload images (max 25)
router.post(
  "/submit",
  upload.array("images", 25),
  submitForm
);

// GET: test route
router.get("/test", (req, res) => {
  res.json({ message: "Submit routes working" });
});

module.exports = router;
