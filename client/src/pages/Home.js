import { useEffect, useState } from "react";
import axios from "axios";
import PriceCard from "../components/cards/PriceCard";
const Home = () => {
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    fetchPrices();
  }, []);
  const fetchPrices = async () => {
    const { data } = await axios.get("http://localhost:8000/api/prices");
    console.log("Prices get request", data);
    setPrices(data);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("plan clicked");
  };
  return (
    <div className="container-fluid">
      <div className="row col-md-6 offset-md-3 text-center">
        <h1 className="pt-5 fw-bold">
          Explore the right plan for your business
        </h1>
        <p className="lead pb-4">Choose a plan that suites you best</p>
      </div>
      <div className="row pt-5 mb-3 text-center">
        {prices &&
          prices.map((price) => (
            <PriceCard key={price.id} price={price} handleClick={handleClick} />
          ))}
      </div>
    </div>
  );
};
export default Home;
