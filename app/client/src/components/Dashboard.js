import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:5000/areaChart", {
      method: 'GET'
    }).then(res => {
      return res.json()
    }, err => {
      console.log(err);
    }).then((response) => {
      this.setState({
        data : response
      });
    });
  }

  render() {
    return (
      <AreaChart
        width={1200}
        height={500}
        data={this.state.data}
        margin={{
          top: 50,
          right: 75,
          left: 50,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="cattle_supply"
          stackId="1"
          stroke="#3B528BFF"
          fill="#3B528BFF"
        />
        <Area
          type="monotone"
          dataKey="swine_supply"
          stackId="1"
          stroke="#21908CFF"
          fill="#21908CFF"
        />
        <Area
          type="monotone"
          dataKey="oj_supply"
          stackId="1"
          stroke="#440164FF"
          fill="#440164FF"
        />
        <Area
          type="monotone"
          dataKey="corn_supply"
          stackId="1"
          stroke="#FDE725FF"
          fill="#FDE725FF"
        />
        <Area
          type="monotone"
          dataKey="wheat_supply"
          stackId="1"
          stroke="#5DC863FF"
          fill="#5DC863FF"
        />
      </AreaChart>
    );
  }
}
