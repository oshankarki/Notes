import { useState, useContext } from "react";
import validator from "../utils/validator";
import noteSchema from "../utils/noteSchema";
import Input from "../common/Input";
import Button from "../common/Button";
import { postNotes } from "api/request.api";
import UserContext from "store/context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { FaList } from "react-icons/fa";

function Create() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [data, setData] = useState({
    title: "",
    content: "",
    userId: user._id, // set the userId field from the authenticated user context
  });

  const [errors, setErrors] = useState({});

  const validate = validator(noteSchema);

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
        const res = await postNotes({
          title: data.title,
          content: data.content,
          userId: data.userId, // include the userId field in the request body
        });
        console.log(res);
        navigate("/note");
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
        <div className="row  justify-content-center ">
          <div className="col-5">
            <div className="row">
              <div className="col-12 text-center">
                <h1>Create Notes</h1>
              </div>

              <form onSubmit={handleSubmit}>
                <Input
                  label="Title"
                  type="text"
                  id="title"
                  name="title"
                  value={data.title}
                  handler={handleChange}
                  error={errors.title}
                />
                <Input
                  label="Content"
                  type="textarea"
                  id="content"
                  name="content"
                  value={data.content}
                  handler={handleChange}
                  error={errors.content}
                  rows={5}
                />

                <Button type="submit" label="Create Note" color="primary" />
              </form>
            </div>
          </div>
        </div>
        <Link to="/note" className="btn btn-outline-primary">
          <span>
            <FaList />
          </span>{" "}
          Your Notes
        </Link>
      </div>
    </div>
  );
}

export default Create;
