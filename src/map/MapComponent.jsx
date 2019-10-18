// Refs:
// - https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1
// - https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/geocoding-simple
import React, {createRef} from "react";
import {API_KEY} from "../resources/Keys"
import DataService from "../services/DataService"

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    createMarker(map, country, position, views){
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

        // let infowindow = new window.google.maps.InfoWindow({
        //     content: "Meh"
        // });

        // Create marker
        let marker = new window.google.maps.Marker({
            position: position,
            map: map,
            title: views + " views",
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "red",
                fillOpacity: 0.2,
                strokeWeight: 0,
                scale: scale
            }
        });

        // TODO: addEventListener OR tooltip OR something else that i don't remember the name of
        marker.addListener("click", () => {
            // infowindow.open(map, marker);
            // Show trending videos
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
                        this.createMarker(this.googleMap, COUNTRIES[country].name, position, TEMP_VIEWS);
                    }
                }
            )
        })
    }

    render() {
        return (
            <div
                id="google-map"
                ref={this.state.googleMapRef}
                style={{ width: this.state.width, height: this.state.height }}
            />
        );
    }
}


export default MapComponent
