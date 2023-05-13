import React from "react";
import { useNavigate } from "react-router-dom";

function ThankYouPage() {
  let navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/package/search`;
    navigate(path);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        height: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#333" }}>Thank You!</h2>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Your booking has been submitted successfully.
      </p>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        We'll be in touch with you shortly to confirm your reservation.
      </p>
      <button
        onClick={routeChange}
        style={{
          backgroundColor: "#4CAF50",
          color: "#FFF",
          padding: "1rem",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default ThankYouPage;
