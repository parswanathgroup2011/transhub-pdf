import { useState } from "react";
import { submitForm } from "./api";

/* shared input style */
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginTop: 6,
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

function App() {
  const [images, setImages] = useState([]);
  const [phone, setPhone] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");


const handleSubmit = async () => {
  if (!images.length) {
    alert("Please select at least one image");
    return;
  }

  if (!phone) {
    alert("Please enter phone number");
    return;
  }

  const formData = new FormData();
  images.forEach(file => formData.append("images", file));
  formData.append("phone", phone);
  formData.append("remarks", remarks);

  try {
    setLoading(true);

    const res = await submitForm(formData);
    const pdfLink = res.data.pdfUrl;

    const message = `
Hello,

Please find your PDF here:
${pdfLink}

Remarks:
${remarks}
`;

    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // ✅ store only (do NOT open)
    setPdfUrl(pdfLink);
    setWhatsappLink(waLink);

  } catch (err) {
    alert("Upload failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f1f5f9", // ✅ uniform background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
        }}
      >
        {/* HEADER */}
        <h2
          style={{
            textAlign: "center",
            marginBottom: 6,
            fontSize: 22,
            fontWeight: 700,
            color: "#1e293b",
          }}
        >
          Image to PDF Converter
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#64748b",
            marginBottom: 24,
          }}
        >
          Upload images and generate a single PDF
        </p>

        {/* IMAGE UPLOAD */}
        <label style={{ fontWeight: 600, fontSize: 14 }}>
          Upload Images
        </label>

        <div
          style={{
            marginTop: 8,
            padding: 20,
            border: "2px dashed #a5b4fc",
            borderRadius: 12,
            textAlign: "center",
            backgroundColor: "#f8fafc",
            cursor: "pointer",
          }}
        >
        <input
          type="file"
          multiple
          accept="image/*,application/pdf"
          onChange={(e) => setImages([...e.target.files])}
        />


          <p
            style={{
              fontSize: 13,
              marginTop: 10,
              color: "#475569",
            }}
          >
            {images.length
              ? `${images.length} image(s) selected`
              : "Click to choose image files"}
          </p>
        </div>

        {/* PHONE */}
        <label
          style={{
            fontWeight: 600,
            marginTop: 18,
            display: "block",
          }}
        >
          Phone Number
        </label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        {/* REMARKS */}
        <label
          style={{
            fontWeight: 600,
            marginTop: 18,
            display: "block",
          }}
        >
          Remarks
        </label>
        <textarea
          placeholder="Optional remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "none" }}
        />

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 24,
            padding: "12px 0",
            borderRadius: 12,
            border: "none",
            backgroundColor: loading ? "#94a3b8" : "#4f46e5",
            color: "#ffffff",
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating PDF..." : "Generate PDF"}
        </button>

        {/* RESULT */}
        {pdfUrl && (
          <div
            style={{
              marginTop: 24,
              padding: 14,
              backgroundColor: "#ecfeff",
              borderRadius: 12,
              textAlign: "center",
              border: "1px solid #67e8f9",
            }}
          >
            <p
              style={{
                marginBottom: 6,
                fontWeight: 700,
                color: "#0369a1",
              }}
            >
              ✅ PDF Ready
            </p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#2563eb",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Download PDF
            </a>
          </div>

        )}
        {/* SEND ON WHATSAPP BUTTON */}
{whatsappLink && (
  <button
    onClick={() => window.open(whatsappLink, "_blank")}
    style={{
      width: "100%",
      marginTop: 14,
      padding: "12px 0",
      borderRadius: 10,
      border: "none",
      backgroundColor: "#22c55e",
      color: "#fff",
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
    }}
  >
    Send on WhatsApp
  </button>
)}
      </div>
    </div>
  );
}

export default App;
