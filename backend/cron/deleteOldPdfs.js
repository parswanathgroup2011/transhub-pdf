const cron = require("node-cron");
const Submission = require("../models/Submission");
const cloudinary = require("../config/cloudinary");

// Runs every day at 2 AM
cron.schedule("0 2 * * *", async () => {
  console.log("🧹 Running 30-day PDF cleanup job");

  try {
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const cutoffDate = new Date(Date.now() - THIRTY_DAYS);

    // Find old PDFs
    const oldSubmissions = await Submission.find({
      createdAt: { $lt: cutoffDate },
      cloudinaryPublicId: { $exists: true, $ne: null }
    });

    for (const item of oldSubmissions) {
      try {
        // Delete from Cloudinary
        await cloudinary.uploader.destroy(item.cloudinaryPublicId, {
          resource_type: "raw"
        });

        // Remove Cloudinary fields (keep record)
        item.pdfUrl = null;
        item.cloudinaryPublicId = null;
        await item.save();

        console.log("✅ Deleted PDF:", item._id);
      } catch (err) {
        console.error("❌ Delete failed for:", item._id, err.message);
      }
    }

    console.log("🧹 Cleanup completed");
  } catch (err) {
    console.error("❌ Cron job error:", err.message);
  }
});
