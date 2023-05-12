import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

function InnerPackageView() {
  const [packageItem, setPackages] = React.useState(null);
  const { id } = useParams();

  const client = axios.create({
    baseURL: "http://localhost:8080/packages"
  });

  React.useEffect(() => {
    async function getPackages() {
      const response = await client.get(`/${id}`);
      setPackages(response.data);
    }
    getPackages();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    {packageItem ? (
      <div style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={packageItem.imgPath} alt={packageItem.name} style={{ maxWidth: '100%', height: 'auto' }} />
          <h2 style={{ marginTop: '1rem' }}>{packageItem.name}</h2>
          <p style={{ margin: '0.5rem 0' }}>Price: {packageItem.price}</p>
          <p style={{ margin: '0.5rem 0' }}>Duration: {packageItem.duration}</p>
          <p style={{ margin: '0.5rem 0' }}>Destination: {packageItem.destination}</p>
          <p style={{ margin: '0.5rem 0' }}>Ratings: {packageItem.rating}</p>
          <p style={{ margin: '1rem 0' }}>{packageItem.description}</p>
          <button style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '3px', backgroundColor: 'blue', color: 'white', cursor: 'pointer' }}>Book Now</button>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}

export default InnerPackageView;
