// Ref: https://reactjs.org/docs/forms.html
import React from "react";
import {Link} from "react-router-dom";

import DataService from "../services/DataService"

class HistoryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cid: "",
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
            }
        );
    }

    // Every trending videos of the selected country
    renderVideos() {
        let videos = [];

        DataService.getAllTrendingVideos(this.state.cid).then(
            response => {
                const VIDEOS = response.data;

                // TODO: VideoComponent
                if (VIDEOS != null) {
                    for (let video in VIDEOS) {
                        videos.push(
                            <div key={video.id} className="col-lg-6 mt-2 mb-2">
                                <Link to=
                                    {{
                                        pathname: `/history/${video.id}`,
                                        state: {
                                            name: video.name
                                        }
                                    }}
                                >
                                    <div className="card">
                                        <iframe className="card-img-top"
                                            title={video.id}
                                            width="560" height="315"
                                            src={`https://www.youtube.com/embed/${video.id}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        >
                                        </iframe>
                                        <div className="card-body">
                                            <div className="card-text">{video.name}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    }
                }
            }
        )

        return videos;
    }

    // Update state according to user input
    handleChange(event) {
        let countries = this.state.form.countries;
        this.setState({
            cid: event.target.key,
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
                {/*Form*/}
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

                {/*Videos*/}
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
