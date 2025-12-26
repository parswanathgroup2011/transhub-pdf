const cloudinary = require("../config/cloudinary");

exports.uploadPdfToCloudinary = async (pdfPath) => {
  const result = await cloudinary.uploader.upload(pdfPath, {
    resource_type: "raw",
    folder: "transhub_node_pdfs"
  });

  return {
    pdfUrl: result.secure_url,      // ✅ correct key name
    publicId: result.public_id      // ✅ needed for delete
  };
};
