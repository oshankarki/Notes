import { useState } from "react";

import validator from "utils/validator";
import createBookSchema from "utils/registerSchema";

import Input from "common/Input";
import Button from "common/Button";

import { user } from "api/request.api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validate = validator(createBookSchema);

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
        const res = await user(data); //call axios from register
        console.log(res);
        navigate("/admin/user");
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
              <div className="col-12 text-center">
                <h1>Create User</h1>
                <Link to="/admin/user" className="btn btn-outline-primary">
                  List
                </Link>
              </div>

              <div className="col-12 border rounded-2 p-5 bg-white">
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Enter name..."
                    name="name"
                    id="name"
                    value={data.name}
                    error={errors?.name}
                    handler={handleChange}
                  />

                  <Input
                    label="Email"
                    type="text"
                    placeholder="Enter email..."
                    name="email"
                    id="email"
                    value={data.email}
                    error={errors?.email}
                    handler={handleChange}
                  />

                  <Button type="submit" label="Create" color="primary" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
