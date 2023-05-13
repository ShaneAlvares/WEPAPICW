import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function InnerPackageView() {
  const [packageItem, setPackages] = React.useState(null);
  const { id } = useParams();

  const client = axios.create({
    baseURL: "http://localhost:8080/packages",
  });

  React.useEffect(() => {
    async function getPackages() {
      const response = await client.get(`/${id}`);
      setPackages(response.data);
    }
    getPackages();
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
    >
      {packageItem ? (
        <div
          style={{
            maxWidth: "800px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={packageItem.imgPath}
              alt={packageItem.name}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10px 10px 0px 0px",
              }}
            />
            <h2
              style={{
                marginTop: "1rem",
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {packageItem.name}
            </h2>
            <p
              style={{
                margin: "0.5rem 0",
                textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Price: {packageItem.price}
            </p>
            <p
              style={{
                margin: "0.5rem 0",
                textAlign: "center",
                fontSize: "1rem",
              }}
            >
              Duration (Days): {packageItem.duration}
            </p>
            <p
              style={{
                margin: "0.5rem 0",
                textAlign: "center",
                fontSize: "1rem",
              }}
            >
              Destination: {packageItem.destination}
            </p>
            <p
              style={{
                margin: "0.5rem 0",
                textAlign: "center",
                fontSize: "1rem",
              }}
            >
              Ratings: {packageItem.rating}
            </p>
            <p style={{ margin: "1rem 0", textAlign: "center" }}>
              {packageItem.description}
            </p>
            <a
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "3px",
                backgroundColor: "#3f51b5",
                color: "white",
                cursor: "pointer",
                textDecoration: "none",
                marginBottom: "1rem",
              }}
              href={"/package/CheckoutPackagePage/" + id}
            >
              Book Now
            </a>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InnerPackageView;
