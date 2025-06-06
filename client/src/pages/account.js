import React, { useState, useEffect, useContext } from "react";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context";
const Account = () => {
  const history = useHistory();
  const [state, setState] = useContext(UserContext);
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    const getSubscriptions = async () => {
      const { data } = await axios.get("/subscriptions");
      console.log("subs => ", data);
      setSubscriptions(data.data);
    };
    if (state && state.token) getSubscriptions();
  }, [state && state.token]);
  const manageSubscriptions = async () => {
    const { data } = await axios.get("/customer-portal");
    window.open(data);
  };
  return (
    <div className="container">
      <div className="row">
        <UserOutlined className="display-4" />
        <h1>Account</h1>
        <p className="lead pb-4">Subscription status</p>
      </div>
      <div className="row">
        {subscriptions &&
          subscriptions.map((sub) => (
            <div key={sub.id}>
              <section>
                <hr />
                <h4 className="fw-bold">{sub.plan.nickname}</h4>
                <h5>
                  {(sub.plan.amount / 100).toLocaleString("en-us", {
                    style: "currency",
                    currency: sub.plan.currency,
                  })}
                </h5>
                <p>Status:{sub.status}</p>
                <p>
                  Card last 4 digit: {sub.default_payment_method.card.last4}
                </p>
                <p>
                  Current period end:{" "}
                  {moment(sub.items.data[0].current_period_end * 1000)
                    .format("dddd, MMMM Do YYYY h:mm:ss a")
                    .toString()}
                </p>
                <button
                  onClick={() =>
                    history.push(`/${sub.plan.nickname.toLowerCase()}`)
                  }
                  className="btn btn-outline-danger"
                >
                  Access
                </button>{" "}
                <button
                  onClick={manageSubscriptions}
                  className="btn btn-outline-warning"
                >
                  Manage subscription
                </button>
              </section>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Account;
