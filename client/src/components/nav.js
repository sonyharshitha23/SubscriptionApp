import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context";
import Account from "../pages/account.js";
const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    setState({ user: {}, token: "" });
    localStorage.removeItem("auth");
    history.push("/login");
  };
  console.log("STATE=>", state);
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
            Home
          </Link>
        </li>
        {state && state.token ? (
          <div className="nav-item dropdown">
            <li className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              {state.user.email}
            </li>
            <ul className="dropdown-menu" aria-label>
              <li className="nav-item dropdown-item">
                <Link className="nav-link" to="/account">
                  Account
                </Link>
              </li>
              <li className="nav-item dropdown-item">
                <a onClick={logout} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
            <hr />
          </div>
        ) : (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <hr />
          </Fragment>
        )}
      </ul>
      <hr style={{ borderTop: "1px solid #aaa", margin: "5px 0" }} />
    </div>
  );
};
export default Nav;
