// Refs:
// - https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1
// - https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/geocoding-simple
import React, {createRef} from "react";
import {API_KEY} from "../resources/Keys"
import {COUNTRIES} from "../resources/MockData";
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
        // TODO: change center
        return new window.google.maps.Map(this.state.googleMapRef.current, {
            zoom: 3,
            center: {
                lat: 43.642567,
                lng: -79.387054,
            },
            disableDefaultUI: true
        })
    }

    createMarker(map, geocoder, country, views){
        geocoder.geocode({'address': country}, (results, status) => {
            if (status === 'OK') {
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

                let infowindow = new window.google.maps.InfoWindow({
                    content: "Meh"
                });

                let marker = new window.google.maps.Marker({
                    position: results[0].geometry.location,
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
                    infowindow.open(map, marker);
                })
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    componentDidMount() {
        // Google Maps API
        const googleScript = document.createElement("script");
        googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
        window.document.body.appendChild(googleScript);

        googleScript.addEventListener("load", () => {
            this.googleMap = this.createGoogleMap();

            let geocoder = new window.google.maps.Geocoder();
            const TEMP_VIEWS = 330000;

            // TODO: Get data
            // let countries = COUNTRIES;
            // for (let country in countries) {
            //     this.createMarker(this.googleMap, geocoder, country, COUNTRIES[country]);
            // }

            DataService.getCountries().then(
                response => {
                    let countries = response.data;

                    // Add markers
                    for (let country in countries) {
                        console.log("Name: " + countries[country].name);
                        this.createMarker(this.googleMap, geocoder, countries[country].name, TEMP_VIEWS);
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
