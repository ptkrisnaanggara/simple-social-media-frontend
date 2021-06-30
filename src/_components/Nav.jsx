import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/friends" className="nav-item nav-link">Friends</NavLink>
                <NavLink to="/request" className="nav-item nav-link">Requests</NavLink>
            </div>
        </nav>
    );
}

export { Nav };