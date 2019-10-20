// Refs: https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1
import React, {createRef} from "react";
import {API_KEY} from "../resources/Keys"
import DataService from "../services/DataService"
import VideoComponent from "../video/VideoComponent"

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: "",
            videos: [],
            googleMapRef: createRef(),
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    createGoogleMap() {
        return new window.google.maps.Map(this.state.googleMapRef.current, {
            zoom: 3,
            center: {
                lat: -33.865143,
                lng: 151.209900,
            },
            disableDefaultUI: true
        })
    }

    createMarker(map, cid, country, position, views){
        // Set scale
        const DEFAULT_SCALE = 1/100000;
        const MIN_SCALE = 10;
        const MAX_SCALE = 50;
        let scale = DEFAULT_SCALE * views;
        if (scale > MAX_SCALE) {
            scale = MAX_SCALE;
        } else if (scale < MIN_SCALE) {
            scale = MIN_SCALE;
        }

        // Create marker
        let marker = new window.google.maps.Marker({
            position: position,
            map: map,
            title: cid,
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "red",
                fillOpacity: 0.2,
                strokeWeight: 0,
                scale: scale
            }
        });

        marker.addListener("click", () => {
            // Show trending videos
            DataService.getTopTrendingVideos(cid).then(
                response => {
                    this.setState({
                        country: country,
                        videos: response.data
                    })
                }
            )
        })
    }

    componentDidMount() {
        // Google Maps API
        const googleScript = document.createElement("script");
        googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
        window.document.body.appendChild(googleScript);

        googleScript.addEventListener("load", () => {
            this.googleMap = this.createGoogleMap();

            // Placeholder for total views
            const TEMP_VIEWS = 1000000;

            // Get countries
            DataService.getCountries().then(
                response => {
                    const COUNTRIES = response.data;

                    // Add markers
                    for (let country in COUNTRIES) {
                        let position = {
                            lat: parseFloat(COUNTRIES[country].latitude),
                            lng: parseFloat(COUNTRIES[country].longitude)
                        }
                        this.createMarker(this.googleMap, COUNTRIES[country].cid, COUNTRIES[country].name, position, TEMP_VIEWS);
                    }
                }
            )
        })
    }

    render() {
        return (
            <div className="row">
                {/*Map*/}
                <div className="col-lg-9"
                    id="google-map"
                    ref={this.state.googleMapRef}
                    style={{ width: this.state.width, height: this.state.height }}
                />

                {/*Display video if a country is selected*/}
                <div className="col-lg-3 overflow-auto" style={{height: this.state.height}}>
                    <div className="container-fluid">
                        <h1>Trending {this.state.country !== "" ? ` in ${this.state.country}` : ""}</h1>
                        {
                            this.state.videos.length !== 0 ?
                                this.state.videos.map(
                                    video => {
                                        return <VideoComponent size="row-lg" key={video.vid} video={video} />
                                    }
                                ) :
                                <p>Select a country to see trending videos</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default MapComponent
