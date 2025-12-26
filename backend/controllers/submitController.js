const fs = require("fs");
const Submission = require("../models/Submission");
const { createPdfFromImages } = require("../services/pdfService");
const { uploadPdfToCloudinary } = require("../services/cloudinaryService");

exports.submitForm = async (req, res) => {
  try {
    const { phone, remarks } = req.body;
    const files = req.files;

    // ❌ No images
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded"
      });
    }

    // 1️⃣ Create PDF from images
    const pdfResult = await createPdfFromImages(files);

    // 2️⃣ Upload PDF to Cloudinary
    const uploadResult = await uploadPdfToCloudinary(pdfResult.pdfPath);

    // 🔥 IMPORTANT: normalize public_id (REMOVE .pdf if exists)
    const cleanPublicId = uploadResult.publicId.replace(/\.pdf$/i, "");

    // 3️⃣ Save record to MongoDB
    const submission = await Submission.create({
      phone,
      remarks,
      pdfName: pdfResult.pdfName,
      imageCount: files.length,
      pdfUrl: uploadResult.pdfUrl,
      cloudinaryPublicId: cleanPublicId
    });

    // 4️⃣ Cleanup local PDF
    fs.unlinkSync(pdfResult.pdfPath);

    // 5️⃣ Response
    return res.status(200).json({
      success: true,
      message: "PDF uploaded to Cloudinary & saved",
      data: {
        id: submission._id,
        phone: submission.phone,
        remarks: submission.remarks,
        imageCount: submission.imageCount,
        pdfUrl: submission.pdfUrl,
        createdAt: submission.createdAt
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
