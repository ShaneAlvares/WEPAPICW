
import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Package() {


  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter1, setFilter1] = React.useState('');
  const [filter2, setFilter2] = React.useState('');
  const [filter3, setFilter3] = React.useState('');
  const [packages, setPackages] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [SearchType, setSearchType] = React.useState('');
  

  const client = axios.create({
    baseURL: "http://localhost:8080/packages"
  });
  React.useEffect(() => {
    async function getPackages() {
      const response = await client.get("/");
      setPackages(response.data);
    }
    getPackages();
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleFilter1 = event => {
    setFilter1(event.target.value);
  };

  const handleFilter2 = event => {
    setFilter2(event.target.value);
  };

  const handleFilter3 = event => {
    setFilter3(event.target.value);
  };

  const handleClick = (paramValue) => {
    // Do something with the parameter value
    console.log(SearchType);
    if (SearchType == 'price') {
      async function getPackages() {
        const response = await client.get(`?price=${paramValue}`);
        setPackages(response.data);
      }
      getPackages();

      console.log(paramValue);
    }
    if (SearchType == 'duration') {

      async function getPackages() {
        const response = await client.get(`?duration=${paramValue}`);
        setPackages(response.data);
      }
      getPackages();

      console.log(paramValue);
    }
    if (SearchType == 'destination') {
      async function getPackages() {
        const response = await client.get(`?destination=${paramValue}`);
        setPackages(response.data);
      }
      getPackages();

      console.log(paramValue);

    }
    if (SearchType == 'capacity') {
      async function getPackages() {
        const response = await client.get(`?capacity=${paramValue}`);
        setPackages(response.data);
      }
      getPackages();

      console.log(paramValue);

    }
    if (SearchType == 'specialty') {
      async function getPackages() {
        const response = await client.get(`?specialty=${paramValue}`);
        setPackages(response.data);
      }
      getPackages();

      console.log(paramValue);

    }

  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  }
 
  // let navigate = useNavigate(); 
  // const routeChange = (id) =>{ 
  //   let path = `/singlePackageView`; 
  //   navigate(path);
  // }
  const spacing = 6;

  const divStyle = {
    marginRight: `${spacing}em`,
  };


  const filteredData = packages?.filter(
    item =>
      (filter1 === "" || item.duration === parseInt(filter1)) &&
      (filter2 === "" || item.rating === parseInt(filter2)) &&
      (filter3 === "" || item.price <= parseInt(filter3))
  );

  //  const filteredData = packages

  if (!packages) return "No Packeges!"
  return (
    <div className="container">
        <div>
        <select
          value={SearchType}
          onChange={handleSearchTypeChange}
          style={divStyle}
        >
          <option value="">Search Type</option>
          <option value="destination">Destination</option>
          <option value="duration">Duration</option>
          <option value="capacity">Number of Travelers</option>
          <option value="specialty">Specialty</option>
        </select>

        <input type="text" placeholder="Search" value={inputValue} onChange={handleChange} style={divStyle} />
        <button className="float-right" onClick={() => handleClick(inputValue)} >Search</button >
      </div><br></br>
      <div className="row mb-3">
        <div className="col">
          <select
            className="form-control"
            value={filter1}
            onChange={handleFilter1}
          >
            <option value="">Filter by Duration</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="col">
          <select
            className="form-control"
            value={filter2}
            onChange={handleFilter2}
          >
            <option value="">Filter by rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Price"
            value={filter3}
            onChange={handleFilter3}
          />
        </div>
      </div>
    
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Destination</th>
            <th>Duration (Days)</th>
            <th>Rating</th>
            <th>Price $</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.destination}</td>
              <td>{item.duration}</td>
              <td>{item.rating}</td>
              <td>{item.price}</td>
              <td><a class="btn btn-primary btn-sm" type="button" href={'/package/innerPackageView/'+ item._id }>View More</a></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Package;
