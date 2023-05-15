import { useState } from "react";

import validator from "utils/validator";
import registerSchema from "utils/registerSchema";

import Input from "common/Input";
import Button from "common/Button";

import { register } from "api/request.api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css"
function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = validator(registerSchema);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value, { errors, setErrors });
    setData({ ...data, [name]: value });
  };

  const isValid = () => {
    for (const [key, value] of Object.entries(data))
      validate(key, value, { errors, setErrors });

    if (Object.keys(errors).length === 0) return true;
    else return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid()) {
      try {
        const res = await register(data); //call axios from register
        console.log(res);
        navigate("/login");
      } catch (err) {
        setErrors(err.response.data.error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row  justify-content-center align-items-center">
          <div className="col-5">
            <div className="row">
              <div className="col-12 border rounded-2 p-5 bg-white">
                <div className="col-12 text-center">
                  <h1>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Enter name..."
                    name="name"
                    id="name"
                    value={data.name}
                    handler={handleChange}
                  />
                <div className="error">{errors?.name}</div>


                  <Input
                    label="Email"
                    type="text"
                    placeholder="Enter email..."
                    name="email"
                    id="email"
                    value={data.email}
                    handler={handleChange}
                  />
                <div className="error">{errors?.email}</div>


                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password..."
                    name="password"
                    id="password"
                    value={data.password}
                    handler={handleChange}
                  />
                <div className="error">{errors?.password}</div>

                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter password..."
                    name="confirmPassword"
                    id="confirmPassword"
                    value={data.confirmPassword}
                    handler={handleChange}
                  />
                  
                <div className="error">{errors?.confirmPassword}</div>
                  <Button type="submit" label="Register" color="primary" />
                </form>
                <div className="account_create">
                  Already have a account?
                  <Link className="nav-links-href" to="/login">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
