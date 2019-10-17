import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import NavComponent from "./core/NavComponent.jsx";
import MapComponent from "./map/MapComponent.jsx";
import HistoryComponent from "./history/HistoryComponent.jsx";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <NavComponent />
                <Switch>
                    <Route path="/" exact component={MapComponent} />
                    <Route path="/map" component={MapComponent} />
                    <Route path="/history" component={HistoryComponent} />
                </Switch>
            </Router>
        );
    }
}

export default App;
