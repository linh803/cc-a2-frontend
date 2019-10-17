import React from "react";
import {Link} from "react-router-dom";

class NavComponent extends React.Component {
    render() {
        return (
            <nav className="nav-bar">
                <ul className="nav">
                    <li className="nav-item"><Link className="nav-link" to="/map">Map</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/history">History</Link></li>
                </ul>
            </nav>
        );
    }
}

export default NavComponent;
