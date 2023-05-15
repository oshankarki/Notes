import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Note from "Notes/index";
import UserContext from "store/context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function Index() {
  const { user } = useContext(UserContext);

if(user){
  return (
    <div>
      <main className="mainPage">
        <div className="paragraph">          
          <Note/>
        </div>
      </main>
    </div>
  );
}

else{
  return(
    <Navigate to = "/login"/>
)
}
}

export default Index;
