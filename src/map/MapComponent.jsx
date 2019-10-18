// Refs:
// - https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1
// - https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/geocoding-simple
import React, {createRef} from "react";
import {API_KEY} from "../resources/Keys"
import DataService from "../services/DataService"
import VideoComponent from "../video/VideoComponent"

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    createMarker(map, cid, position, views){
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
            // infowindow.open(map, marker);
            // Show trending videos
            DataService.getTopTrendingVideos(cid).then(
                response => {
                    this.setState({
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

            // Placeholder for toal views
            const TEMP_VIEWS = 330000;

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
                        this.createMarker(this.googleMap, COUNTRIES[country].cid, position, TEMP_VIEWS);
                    }
                }
            )
        })

        // window.onresize = () => {
        //     this.setState();
        // }
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-9 mt-2 mb-2"
                    id="google-map"
                    ref={this.state.googleMapRef}
                    style={{ width: this.state.width, height: this.state.height }}
                />
                <div className="col-lg-3">
                    {/*Display video if a country is selected*/}
                    {
                        this.state.videos.map(
                            video => {
                                return <VideoComponent size="row-lg" key={video.vid} video={video} />
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}


export default MapComponent
