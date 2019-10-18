// Ref: https://reactjs.org/docs/forms.html
import React from "react";
import {Link} from "react-router-dom";

import DataService from "../services/DataService"
import {VIDEOS} from "../resources/MockData";

class HistoryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: "",
            form: {
                country: "",
                countries: []
            }
        }

        this.renderVideos = this.renderVideos.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Init list of countries
        DataService.getCountries().then(
            response => {
                this.setState({
                    form: {
                        countries: response.data
                    }
                });

                console.log("Imported countries!!!");
            }
        );
    }

    // Every trending videos of the selected country
    renderVideos() {
        let country = this.state.country;

        let videos = [];

        // TODO: Get reallll dataaaaaaa
        if (VIDEOS[country] != null) {
            for (let id in VIDEOS[country]) {
                videos.push(
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

        return videos;
    }

    handleChange(event) {
        let countries = this.state.form.countries;
        this.setState({
            form: {
                country: event.target.value,
                countries: countries
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
        let videos = this.renderVideos();

        return (
            <div>
                <div className="container-fluid">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="col">
                                <input list="countries" type="text" className="form-control form-control-lg mr-2" placeholder="Enter a country :)" onChange={this.handleChange} />
                                    <datalist id="countries">
                                        {
                                            this.state.form.countries.map(
                                                country => {
                                                    return <option key={country.cid} value={country.name} />
                                                }
                                            )
                                        }
                                    </datalist>
                            </div>

                            <div className="col">
                                <button type="submit" className="btn btn-primary btn-lg">Show Videos</button>
                            </div>
                        </div>
                        </form>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        {videos}
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoryComponent
