import { RouterProvider } from "react-router-dom";
import router from "router/root";
import UserContext from "store/context/UserContext";
import useLocalStorage from "hooks/useLocalStorage";


function App() {
    const [user, setUser] = useLocalStorage("user", {});
    return (
        <div>
            <UserContext.Provider value={{ user, setUser }}>
                <RouterProvider router={router} />
            </UserContext.Provider>
        </div>
    );
}

export default App;