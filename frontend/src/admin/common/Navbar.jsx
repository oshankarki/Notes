import { Link, NavLink } from 'react-router-dom';
import UserContext from 'store/context/UserContext';
import { useContext } from 'react';

function Navbar() {
    const { user, setUser } = useContext(UserContext);
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand ms-3" to="/admin">Dashboard</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/admin/user" className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')}>User</NavLink>
                        </li>
                        
                    </ul>
                </div>
                <ul className="navbar-nav mr-auto">
                <Link to="/admin/details">
                <button className="btn btn-primary">{user?.name}</button>
                </Link>

                    <li className="nav-item me-3">
                        <Link className="btn btn-danger mx-2" to="/login">Logout</Link>
                    </li>
                </ul>
            </nav>
            
        </div>
    )
}

export default Navbar;