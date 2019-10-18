import React from "react";
import {Link} from "react-router-dom";

class VideoComponent extends React.Component {
    render() {
        let thumb_url = "http://img.youtube.com/vi/" + this.props.video.vid + "/maxresdefault.jpg";

        return (
            <div className={`${this.props.size} mt-2 mb-2`}>
                <Link to=
                    {{
                        pathname: `/history/${this.props.video.vid}`,
                        state: {
                            name: this.props.video.name
                        }
                    }}
                >
                    <div className="card">
                        <img className="card-img-top" src={thumb_url} alt="thumbnail"/>

                        <div className="card-body">
                            <div className="card-text"><h3>{this.props.video.name}</h3></div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default VideoComponent
