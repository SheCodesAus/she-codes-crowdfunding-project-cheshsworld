import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <Link to="/">Home</Link> 
            <Link to="/login">Login</Link>                   
            <Link to="/users/register">Register</Link>
            <Link to="/users/:id">Profile</Link>  
          
        </nav>
    );
}

export default Nav;