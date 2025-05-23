import React, { Fragment, useEffect, useContext } from "react";
import { UserContext } from "../../context";
const Basic = ({ history, match }) => {
  const [state, setState] = useContext(UserContext);
  useEffect(() => {
    let result = [];
    const check = () =>
      state &&
      state.user &&
      state.user.subscriptions &&
      state.user.subscriptions.map((sub) => {
        result.push(sub.plan.nickname);
      });
    check();
    const plan = match.path.split("/")[1].toUpperCase();
    if (!result.includes(plan)) {
      history.push("/");
    }
    console.log("MATCH", match);
  }, [state && state.user]);
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row py-5 bg-light text-center">
          <h1 className="display-4 fw-bold">BASIC</h1>
          <p className="lead">Here are your 5 exclusive stocks of this month</p>
        </div>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 p-5 rounded bg-dark text-light">
            <ul className="lead">
              <li>Nvidia</li>
              <li>Meta</li>
              <li>Paypal</li>
              <li>Nio</li>
              <li>Rivian</li>
            </ul>
          </div>
          <div className="col-md">
            <h4>Market analysis</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <h4>Email Support</h4>
            <p>subscriptions@domain.com</p>
            <h4>Help center</h4>
            1300 123 456
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Basic;
