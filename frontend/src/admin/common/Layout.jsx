import { Outlet } from "react-router-dom";

import Navbar from "admin/common/Navbar";
import UserContext from "store/context/UserContext";
import { Navigate } from "react-router-dom";
import { useContext} from "react";

function Layout()
{
    const {user}= useContext(UserContext);
    if(user?.role=="admin")
    {
        return(
            <div>
                <Navbar />
                <Outlet />
            </div>
        )
    }
    
}

export default Layout;