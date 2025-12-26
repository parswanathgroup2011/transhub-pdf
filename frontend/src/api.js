import axios from "axios";

const API_BASE = "http://localhost:5002"; // backend port

export const submitForm = async (formData) => {
  const res = await axios.post(
    `${API_BASE}/api/submit`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return res.data;
};
