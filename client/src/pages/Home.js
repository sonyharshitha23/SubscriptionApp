import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PriceCard from "../components/cards/PriceCard";
import { UserContext } from "../context";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  const [state, setState] = useContext(UserContext);
  const [prices, setPrices] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  useEffect(() => {
    fetchPrices();
  }, []);
  useEffect(() => {
    let result = [];
    const check = () =>
      state &&
      state.user &&
      state.user.subscriptions &&
      state.user.subscriptions.map((sub) => {
        result.push(sub.plan.id);
      });
    check();
    setUserSubscriptions(result);
  }, [state && state.user]);
  const fetchPrices = async () => {
    const { data } = await axios.get("http://localhost:8000/api/prices");
    console.log("Prices get request", data);
    setPrices(data);
  };
  const handleClick = async (e, price) => {
    e.preventDefault();
    console.log("State before subscription:", state);
    if (userSubscriptions && userSubscriptions.includes(price.id)) {
      history.push(`/${price.nickname.toLowerCase()}`);
      return;
    }
    if (state && state.token) {
      const { data } = await axios.post(
        "http://localhost:8000/api/create-subscription",
        {
          priceId: price.id,
        }
      );

      window.open(data);
    } else {
      history.push("/register");
    }
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
            <PriceCard
              key={price.id}
              price={price}
              handleSubscription={handleClick}
              userSubscriptions={userSubscriptions}
            />
          ))}
      </div>
    </div>
  );
};
export default Home;
// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import PriceCard from "../components/cards/PriceCard";
// import { UserContext } from "../context";
// import { useHistory } from "react-router-dom";

// const Home = () => {
//   const history = useHistory();
//   const [state] = useContext(UserContext);
//   const [prices, setPrices] = useState([]);
//   const [userSubscriptions, setUserSubscriptions] = useState([]);

//   // Fetch prices only once (even in strict mode)
//   useEffect(() => {
//     let ignore = false;

//     const fetchPrices = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8000/api/prices");
//         if (!ignore) {
//           console.log("Prices get request", data);
//           setPrices(data);
//         }
//       } catch (err) {
//         console.error("Error fetching prices:", err);
//       }
//     };

//     fetchPrices();

//     return () => {
//       ignore = true;
//     };
//   }, []);

//   // Track user subscriptions safely
//   useEffect(() => {
//     if (state?.user?.subscriptions) {
//       const result = state.user.subscriptions.map((sub) => sub.plan.id);
//       setUserSubscriptions(result);
//     }
//   }, [state?.user]);

//   const handleClick = async (e, price) => {
//     e.preventDefault();

//     // Redirect if already subscribed
//     if (userSubscriptions.includes(price.id)) {
//       history.push(`/${price.nickname?.toLowerCase() || "dashboard"}`);
//       return;
//     }

//     // Create subscription
//     if (state?.token) {
//       try {
//         const { data } = await axios.post(
//           "http://localhost:8000/api/create-subscription",
//           {
//             priceId: price.id,
//           }
//         );
//         if (data?.url) {
//           window.open(data.url, "_blank");
//         } else {
//           console.error("No URL returned from subscription endpoint.");
//         }
//       } catch (err) {
//         console.error("Subscription creation error:", err);
//       }
//     } else {
//       history.push("/register");
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row col-md-6 offset-md-3 text-center">
//         <h1 className="pt-5 fw-bold">
//           Explore the right plan for your business
//         </h1>
//         <p className="lead pb-4">Choose a plan that suits you best</p>
//       </div>
//       <div className="row pt-5 mb-3 text-center">
//         {prices.map((price) => (
//           <PriceCard
//             key={price.id}
//             price={price}
//             handleSubscription={handleClick}
//             userSubscriptions={userSubscriptions}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
