import React, { useState, useContext } from "react";
import Input from "../components/input";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context";
import { useHistory } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useContext(UserContext);
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setEmail("");
        setPassword("");
        setState(data);
        localStorage.setItem("auth", JSON.stringify(data));
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
    }
  };
  return (
    <div className="d-flex justify-content-center style=({height:80vh})">
      <div className="container align-items-center d-flex">
        <div className="row col-md-6 offset-md-3 text-center">
          <AiOutlineLogin
            size={64}
            className="text-primary mb-3"
            style={{ marginTop: "100px" }}
          />
          <h1 className="pt-5 fw-bold">Login</h1>
          <p className="lead pb-4">
            Access your subscriptions. Anytime. Anywhere.
          </p>
          <div className="form-group">
            <Input
              label="Email"
              value={email}
              type="email"
              setValue={setEmail}
            />
            <Input
              label="Password"
              value={password}
              type="password"
              setValue={setPassword}
            />
            <div className="d-grid">
              <Button
                handleClick={handleClick}
                type="danger"
                text="Login"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
