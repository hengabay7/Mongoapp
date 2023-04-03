import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Header = () => {

    const user = null;

    const onLogout = async() => {

    }

    return (
        <header className="header">
        
            <div className="logo">
                <Link to= '/'>MongoApp</Link>
            </div>

            <ul>
                {
                    user ? (
                        <>
                            <li>
                                <button className="btn" onClick={onLogout}><FaSignOutAlt />Logout</button>
                            </li>                          
                        </>
                    ):
                    (
                        <>
                            <li>
                                <Link to='/'><FaSignInAlt /> Login</Link>
                            </li>
                            <li>
                                <Link to='/Register'><FaUserAlt /> Register</Link>
                            </li>
                        </>        
                    )
                }               
            </ul>

        </header>
    )
}
export default Header;