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
import "../style/MapChart.css";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
//import { schemeBlues, interpolateInferno }from "d3-scale-chromatic"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const colorScale = scaleLinear()
  .domain([41, 115376])
  .range(["yellow", "red"])
  .unknown("#ccc");

export default class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      areaData: [],
      mapData: []
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
        areaData : response
      });
    });
    fetch("http://localhost:5000/mapChart", {
      method: 'GET'
    }).then(res => {
      return res.json()
    }, err => {
      console.log(err);
    }).then((responseList) => {
        var stateData = [];
        for (var i = 0; i < responseList.length; i++) {
            var state = responseList[i];
            stateData.push(state);
        }
        
        this.setState({
            mapData : stateData
        });

    });
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="AreaChart">
          <h3>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Trends in Commodities, Electricity, and Rainfall since 1990 in the United States</h3>
          <AreaChart
            width={1200}
            height={500}
            data={this.state.areaData}
            margin={{
              top: 50,
              right: 75,
              left: 100,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis width={80} yAxisId="left" tick={{ fontSize: 10 }}>
              <Label
                value='Commodity/Electric Production' 
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
              stroke="#EAD82B"
              fill="#EAD82B"
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
        <div className="MapChart">
          
          <h3>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Electricty Production by State</h3>
            <>
                <ComposableMap 
                    projection="geoAlbersUsa"
                    projectionConfig={{ scale: 1000 }}
                    width={980}
                    height={551}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                const cur = this.state.mapData.find(s => s.geo_id === geo.id + "\r");
                                if (typeof(cur) != "undefined") {
                                  console.log(colorScale(cur.elec_prod));
                                  return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={colorScale(cur.elec_prod)}
                                    />
                                  );
                                }
                            })
                        }
                    </Geographies>
                </ComposableMap>
            </>
        </div>
      </div>
    );
  }
}
