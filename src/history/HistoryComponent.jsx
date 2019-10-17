// Ref: https://reactjs.org/docs/forms.html
import React from "react";
import {Link} from "react-router-dom";

import {VIDEOS} from "../resources/MockData";

class HistoryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: "",
            form: {
                country: ""
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            form: {
                country: event.target.value
            }
        });
    }

    handleSubmit(event) {
        this.setState({
            country: this.state.form.country
        })
        event.preventDefault();
    }

    render() {
        let country = this.state.country;

        let content = [];

        // TODO: Get reallll dataaaaaaa
        if (VIDEOS[country] != null) {
            for (let id in VIDEOS[country]) {
                content.push(
                    <div key={id}>
                        <Link to=
                            {{
                                pathname: `/history/${id}`,
                                state: {
                                    name: VIDEOS[country][id].name
                                }
                            }}
                        >
                            <div className="row">
                                <div className="col">
                                    <iframe
                                        title={id}
                                        width="560" height="315"
                                        src={`https://www.youtube.com/embed/${id}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    >
                                    </iframe>
                                </div>
                                <div className="col">{VIDEOS[country][id].name}</div>
                            </div>
                        </Link>
                    </div>
                );
            }
        }

        return (
            <div>
                {/*Form*/}
                <form  onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Enter a country :)" value={this.state.form.country} onChange={this.handleChange} />
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
