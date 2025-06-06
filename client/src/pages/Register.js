import React, { useState, useContext } from "react";
import Input from "../components/input";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context";
import { useHistory } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useContext(UserContext);
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setName("");
        setEmail("");
        setPassword("");
        toast.success(
          `Hey ${data.user.name}. You are registered user now. Congrats`
        );
        setState(data);
        localStorage.setItem("auth", JSON.stringify(data));
        history.push("/login");
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
          <Link to="/">
            <AiOutlineHome
              size={64}
              className="text-danger mb-3"
              style={{ marginTop: "70px" }}
            />
          </Link>
          <h1 className="pt-5 fw-bold">Let's Get Started</h1>
          <p className="lead pb-4">
            Sign up for free. No credit card required.
          </p>
          <div className="form-group">
            <Input label="Name" value={name} setValue={setName} />
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
                text="Register"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
