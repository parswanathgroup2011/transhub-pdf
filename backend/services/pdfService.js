const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

exports.createPdfFromImages = async (imageFiles) => {
  const pdfDoc = await PDFDocument.create();

  for (const file of imageFiles) {
    const imagePath = path.join(__dirname, "..", "uploads", "images", file.filename);
    const imageBytes = fs.readFileSync(imagePath);

    let image;
    if (file.mimetype === "image/png") {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      image = await pdfDoc.embedJpg(imageBytes);
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height
    });
  }

  const pdfBytes = await pdfDoc.save();

  const pdfName = `output-${Date.now()}.pdf`;
  const pdfPath = path.join(__dirname, "..", "uploads", pdfName);

  fs.writeFileSync(pdfPath, pdfBytes);

  return {
    pdfName,
    pdfPath
  };
};
