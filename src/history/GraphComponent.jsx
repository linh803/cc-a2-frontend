// Ref: https://developers.google.com/chart/interactive/docs/gallery/linechart
import React from "react";
import Chart from "react-google-charts";

import DataService from "../services/DataService"

class GraphComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vid: "",
            name: "",
            videoViews: []
        }
    }

    componentDidMount() {
        DataService.getVideoViews(this.props.match.params.vid).then(
            response => {
                this.setState({
                    vid: this.props.match.params.vid,
                    name: this.props.location.state.name,
                    videoViews: response.data
                });
            }
        )
    }

    render() {
        // data
        let data = [['time', 'views']];

        for (let index in this.state.videoViews) {
            data.push([this.state.videoViews[index].date, this.state.videoViews[index].views]);
        }

        return (
            <div>
                <h1>{this.state.name}</h1>

                <Chart
                    width={Window.width}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        hAxis: {
                        title: 'Time',
                        },
                        vAxis: {
                            title: 'Views',
                        },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        );
    }
}

export default GraphComponent
