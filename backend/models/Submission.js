const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true
    },
    remarks: {
      type: String
    },
    pdfName: {
      type: String,
      required: true
    },
    pdfUrl: {
      type: String,
      required: true
    },
    cloudinaryPublicId: {
      type: String,
      required: true   // 🔑 REQUIRED FOR AUTO-DELETE
    },
    imageCount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Submission", submissionSchema);
