import React from "react";
import {Link} from "react-router-dom";

class NavComponent extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <Link className="navbar-brand mb-0 h1"to="/map">Trending Videos Map</Link>

                <ul className="nav">
                    <li className="nav-item active"><Link className="nav-link" to="/map">Map</Link></li>
                    <li className="nav-item active"><Link className="nav-link" to="/history">History</Link></li>
                </ul>
            </nav>
        );
    }
}

export default NavComponent;
