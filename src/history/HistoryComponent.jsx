import React from "react";

import {VIDEOS} from "../resources/MockData";

class HistoryComponent extends React.Component {
    render() {
        let country = "Australia";

        let content = [];

        for (let id in VIDEOS[country]) {
            content.push(
                <div className="row">
                    <div className="col">{id}</div>
                    <div className="col">{VIDEOS[country][id]}</div>
                </div>
            )
        }

        return (
            <div>
                {/*Form*/}
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Australia" />
                    </div>

                    <button type="submit" className="btn btn-primary">Search</button>
                </form>

                {/*All trending videos, sorted by views; // TODO: render by search*/}
                {content}
            </div>
        );
    }
}

export default HistoryComponent
