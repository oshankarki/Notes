import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getNote, updateNote } from "api/request.api";
import UserContext from "store/context/UserContext";
import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate, Link } from "react-router-dom";
import { FaList } from 'react-icons/fa';
import './notes.css'

function UpdateNote() {
  const [note, setNote] = useState({ title: "", content: "" });
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await getNote(id, user._id);
        setNote(res.data);
      } catch (error) {
        console.log("error is " + error);
      }
    };
    fetchNote();
  }, [id, user._id]);

  // Extracting title and content from the query or URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const title = params.get("title");
    const content = params.get("content");
    if (title) setNote((prevNote) => ({ ...prevNote, title }));
    if (content) setNote((prevNote) => ({ ...prevNote, content }));
  }, [location.search]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedFields = {};
      if (note.title !== "") updatedFields.title = note.title;
      if (note.content !== "") updatedFields.content = note.content;
      await updateNote(id, user._id, updatedFields)
        .then(() => console.log("Note updated successfully"))
        .catch((err) => console.log("Error updating note:", err));
      navigate("/note");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
        <div className="col-12 text-center">
                <h1>Update Notes</h1>
              </div>
          
        </div>
        <div className="row justify-content-center">
          <div className="col-8">
            <form onSubmit={handleSubmit}>
                <Input
                  label="Title"
                  type="text"
                  id="title"
                  name="title"
                  value={note.title}
                  handler={handleInputChange}
                  
                />
                <Input
                  label="Content"
                  type="textarea"
                  id="content"
                  name="content"
                  value={note.content}
                  handler={handleInputChange}
                  rows={5}
                />

                <Button
                  type="submit"
                  label="Update Note"
                  color="primary"
                />
                
              </form>
          </div>
        </div>
      </div>
      <div className="col-auto">
            <Link to="/note" className="btn btn-outline-primary">
              <span><FaList /></span> Your Notes
            </Link>
          </div>
    </div>
  );
}

export default UpdateNote;
