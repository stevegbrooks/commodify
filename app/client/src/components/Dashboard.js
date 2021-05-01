import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
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
      <div className="Dashboard">
        <div className="AreaChart">
          <h3>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Trends in Commodities, Electricity, and Rainfall since 1990 in the United States</h3>
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
            <YAxis width={80} yAxisId="left" tick={{ fontSize: 10 }}>
              <Label
                value='Commodity Production' 
                position='top' 
                style={{textAnchor: 'middle'}}
                fill='#676767'
                fontSize={14}
              />
            </YAxis>
            <YAxis width={80} yAxisId="right" orientation="right" tick={{ fontSize: 10, }}>
              <Label
                  value='Rainfall' 
                  position='top' 
                  style={{textAnchor: 'middle'}}
                  fill='#676767'
                  fontSize={14}
              />
            </YAxis>
            <Tooltip />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="soy_prod"
              stackId="1"
              stroke="#440164FF"
              fill="#440164FF"
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="corn_prod"
              stackId="1"
              stroke="#FDE725FF"
              fill="#FDE725FF"
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="wheat_prod"
              stackId="1"
              stroke="#5DC863FF"
              fill="#5DC863FF"
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="elec_prod"
              stackId="1"
              stroke="#040404"
              fill="#040404"
              fillOpacity="0"
            />
            <Area
              yAxisId="right" 
              type="monotone"
              dataKey="rainfall"
              stackId="2"
              stroke="#1309EA"
              fill="#1309EA"
              fillOpacity="0"
            />
          </AreaChart>
        </div>
        <div className="Map">
          <h3></h3>
        </div>
      </div>
    );
  }
}
