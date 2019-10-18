// Ref: https://reactjs.org/docs/forms.html
import React from "react";

import DataService from "../services/DataService"
import VideoComponent from "../video/VideoComponent"

class HistoryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: "",
            form: {
                country: "",
                countries: []
            },
            videos: []
        }

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

    // Update state according to user input
    handleChange(event) {
        if (event.target.value != null) {
            let cid = event.target.value.split("-")[0];

            // Update videos
            DataService.getAllTrendingVideos(cid).then(
                response => {
                    let videos = response.data;

                    this.setState({
                        videos: videos
                    })
                }
            );
        }
    }

    handleSubmit(event) {
        this.setState({
            country: this.state.form.country
        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                {/*Form*/}
                <div className="container-fluid mt-2">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            {/*Countries*/}
                            <input list="countries" type="text" className="form-control form-control-lg mr-2" placeholder="Enter a country ヽ(・∀・)ﾉ" onChange={this.handleChange} />
                                <datalist id="countries">
                                    {
                                        this.state.form.countries.map(
                                            country => {
                                                return <option key={country.cid} value={`${country.cid} - ${country.name}`} />
                                            }
                                        )
                                    }
                                </datalist>

                            {/*Submit*/}
                            <span class="input-group-btn">
                                <button type="submit" className="btn btn-primary btn-lg">Show Videos</button>
                            </span>
                        </div>
                    </form>
                </div>

                {/*Videos*/}
                <div className="container-fluid mt-2">
                    <div className="row">
                        {
                            this.state.videos.map(
                                video => {
                                    console.log(video);
                                    return (
                                        <VideoComponent key={video.vid} video={video} size="col-lg-6"/>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoryComponent
