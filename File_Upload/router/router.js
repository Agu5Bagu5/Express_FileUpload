const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "file/");
  },
  filename: (req, file, cb) => {
    const dateNow = Date.now();
    cb(null, `${dateNow}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.use("/", express.json());
router.post("/", upload.single("file"), (req, res) => {
  try {
    res.json({
      status: true,
      msg: "File berhasil di kirim",
      data: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        filename: req.file.filename,
        path: req.file.path,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat mengunggah file",
      error: err.message,
    });
  }
});

module.exports = router;
