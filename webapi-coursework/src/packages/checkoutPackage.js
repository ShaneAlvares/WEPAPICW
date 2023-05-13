import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CheckoutPackagePage({ packageId }) {
  const { id } = useParams();

  const navigate = useNavigate();
  const client = axios.create({
    baseURL: "http://localhost:8080/packages",
  });

  const [formData, setFormData] = React.useState({
    packageId: id,
    fullName: "",
    email: "",
    phone: "",
    numPersons: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await client.post("/bookings", { packageId, ...formData });
      // redirect to thank you page on success
      navigate("/package/CheckoutPackagePage/thankyou");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h2
        style={{
          marginBottom: "2rem",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "green",
        }}
      >
        Package Booking
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "30rem",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="fullName"
            style={{ marginRight: "1rem", fontSize: "1.2rem", color: "green" }}
          >
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            style={{
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
              fontSize: "1.2rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{ marginRight: "1rem", fontSize: "1.2rem", color: "green" }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
              fontSize: "1.2rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="phone"
            style={{ marginRight: "1rem", fontSize: "1.2rem", color: "green" }}
          >
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={{
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
              fontSize: "1.2rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="numPersons"
            style={{ marginRight: "1rem", fontSize: "1.2rem", color: "green" }}
          >
            Number of Persons:
          </label>
          <input
            type="number"
            name="numPersons"
            id="numPersons"
            value={formData.numPersons}
            onChange={handleInputChange}
            style={{
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
              fontSize: "1.2rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label
            htmlFor="numPersons"
            style={{ marginRight: "1rem", fontSize: "1.2rem", color: "green" }}
          >
            Start Date:
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            style={{
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
              fontSize: "1.2rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label
            htmlFor="numPersons"
            style={{ marginRight: "1rem", fontSize: "1.2rem", color: "green" }}
          >
            End Date:
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            style={{
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
              fontSize: "1.2rem",
            }}
          />
        </div>
        {error && (
          <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>
        )}
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            border: "none",
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CheckoutPackagePage;
