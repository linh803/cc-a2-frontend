import React from "react";
import {Link} from "react-router-dom";

class VideoComponent extends React.Component {
    render() {
        let thumb_url = "http://img.youtube.com/vi/" + this.props.video.vid + "/maxresdefault.jpg";
        let size = this.props.size + " " + "mt-2 mb-2";

        return (
            <div className={size}>
                <Link to=
                    {{
                        pathname: `/history/${this.props.video.vid}`,
                        state: {
                            name: this.props.video.name
                        }
                    }}
                >
                    <div className="card">
                        {/*Embedded video
                        <iframe className="card-img-top"
                            title={this.props.video.vid}
                            width="560" height="315"
                            src={`https://www.youtube.com/embed/${this.props.video.vid}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        >
                        </iframe>
                        */}

                        <img className="card-img-top" src={thumb_url}/>

                        {/*Title*/}
                        <div className="card-body">
                            <div className="card-text">{this.props.video.name}</div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default VideoComponent
