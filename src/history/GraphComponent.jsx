// Ref: https://developers.google.com/chart/interactive/docs/gallery/linechart
import React from "react";
import Chart from "react-google-charts";

import {VIDEO_DETAILS} from "../resources/MockData"

class GraphComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vid: "",
            name: ""
        }
    }

    componentDidMount() {
        this.setState({
            vid: this.props.match.params.vid,
            name: this.props.location.state.name
        });
    }

    render() {
        // data
        let data = [['time', 'views']];
        // [
        //     ['time', 'views'],
        //     [0, 0],
        //     [1, 10],
        //     [2, 23],
        //     [3, 17],
        //     [4, 18],
        //     [5, 9],
        //     [6, 11],
        //     [7, 27],
        //     [8, 33],
        //     [9, 40],
        //     [10, 32],
        //     [11, 35],
        // ]

        for (let index in VIDEO_DETAILS) {
            data.push([VIDEO_DETAILS[index].date, VIDEO_DETAILS[index].views]);
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
