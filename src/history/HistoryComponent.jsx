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
                    <div key={id} className="col-lg-6 mt-2 mb-2">
                        <Link to=
                            {{
                                pathname: `/history/${id}`,
                                state: {
                                    name: VIDEOS[country][id].name
                                }
                            }}
                        >
                            <div className="card">
                                <iframe className="card-img-top"
                                    title={id}
                                    width="560" height="315"
                                    src={`https://www.youtube.com/embed/${id}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                >
                                </iframe>
                                <div className="card-body">
                                    <div className="card-text">{VIDEOS[country][id].name}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            }
        }

        return (
            <div>
                <div className="container-fluid">
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-row">
                            <div className="col">
                                <input type="text" className="form-control form-control-lg mr-2" placeholder="Enter a country :)" value={this.state.form.country} onChange={this.handleChange} />
                            </div>

                            <div className="col">
                                <button type="submit" className="btn btn-primary btn-lg">Show Videos</button>
                            </div>
                        </div>
                        </form>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoryComponent
