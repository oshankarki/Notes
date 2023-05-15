import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getNotes, deleteNotes } from "api/request.api";
import { FaEdit, FaTrash } from "react-icons/fa";
import UserContext from "store/context/UserContext";
import { useNavigate } from "react-router-dom";

import "./notes.css";

function View() {
  const navigate= useNavigate();
  const [notes, setNotes] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        console.log(user._id);

        const res = await getNotes(user._id);

        setNotes(res.data);
      } catch (error) {
        console.log("error is " + error);
      }
    };
    fetchNotes();
  }, [user._id]);

  const handleDelete = async (noteId) => {
    try {
      await deleteNotes(noteId, user._id)
        .then(() => console.log("Note deleted successfully"))
        .catch((err) => console.log("Error deleting note:", err));

      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (noteId, title, content) => () => {
    navigate(`/updateNote/${noteId}?title=${title}&content=${content}`);
  };

  return (
    <div className="note-list-container">
      <h1 className="note-list-header">Your Notes </h1>
      <Link to="/createNote" className="btn btn-outline-primary">
          <span>+</span> New Note
        </Link>
      <div className="note-list">
        {notes.map((note) => (
          <div key={note._id} className="card note">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.content}</p>
              <div className="d-flex justify-content-end">
              <Link
  to={`/updateNote/${note._id}?title=${encodeURIComponent(
    note.title
  )}&content=${encodeURIComponent(note.content)}`}
  className="btn btn-primary mr-2"
>
  <FaEdit />
</Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(note._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default View;
