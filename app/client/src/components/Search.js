import React, { Component } from 'react';
import '../style/Search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SectorButton from './SectorButton';
import SearchResultRow from './SearchResultRow';
import WeatherResultRow from './WeatherResultRow';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of sectors,
    // and a list of commodities for a specified sector.
    this.state = {
      sectors: [],
      commodities: [],
      entities: [],
      selectedCommodity: "",
      selectedEntity: "",
      searchYears: [],
      entityType: "",
      name: "React",
      monthAvs: [],
      selectedSector: "",
      comChart: [],
      weatherChart: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.radioButtonChange = this.radioButtonChange.bind(this);
    this.submitOptions = this.submitOptions.bind(this);
    this.sectorSelection = this.sectorSelection.bind(this);
    this.entitySelection = this.entitySelection.bind(this);

  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:5000/commodity_groups",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);

      }).then(sectorList => {
        if (!sectorList) return;
        // Map each sector in this.state.sectors to an HTML element:
        // A button which triggers the showCommodities function for each sector.
        let sectorDivs = sectorList.map((sectorObj, i) =>
          <SectorButton id={"button-" + sectorObj.group_name} onClick={() => this.sectorSelection(sectorObj.group_name)} sector={sectorObj.group_name} />);

        // Set the state of the sectors list to the value returned by the HTTP response from the server.
        this.setState({
          sectors: sectorDivs
        });
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  sectorSelection(sector) {
    this.setState({
      selectedSector: sector
    });
  }

  radioButtonChange(event) {
    console.log(event.target.value);
    this.setState({
      entityType: event.target.value
    });

    var entAndSector = "" + event.target.value + ";" + this.state.selectedSector

    fetch("http://localhost:5000/commodities/" + entAndSector,
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        return res.json();
      }).then(commodityListObj => {

        let commodityList = commodityListObj.map((commodityObj, i) =>
          <option key={i} value={commodityObj.name}>
            {commodityObj.name}
          </option>
        );

        this.setState({
          commodities: commodityList,
        });

        if (commodityList.length > 0) {
          this.setState({
            selectedCommodity: commodityListObj[0].name
          })
        }
      })
  }

  handleChange(e) {
    this.setState({
      selectedCommodity: e.target.value
    });

    var entAndCom = "" + this.state.entityType + ";" + e.target.value

    fetch("http://localhost:5000/entities/" + entAndCom,
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        return res.json();
      }).then(entityListObj => {

        let entityList = entityListObj.map((entityObj, i) =>
          <option key={i} value={entityObj.name}>
            {entityObj.name}
          </option>
        );

        this.setState({
          entities: entityList,
        });

        if (entityList.length > 0) {
          this.setState({
            selectedEntity: entityListObj[0].name
          })
        }
      })
  }

  entitySelection(e) {
    this.setState({
      selectedEntity: e.target.value
    });
  }


  submitOptions() {
    var searchTerms = "" + this.state.selectedCommodity + ";" + this.state.selectedEntity
    // Send an HTTP request to the server.
    fetch("http://localhost:5000/histData/" + searchTerms,
      {
        method: "GET"
      }).then(res => {
        return res.json();
      }, err => {
        console.log(err);
      }).then(searchYearList => {
        let searchYearDivs = searchYearList.map((searchYearObj, i) =>
          <SearchResultRow year={searchYearObj.year}
            production={searchYearObj.production}
            consumption={searchYearObj.consumption}
            ending_stocks={searchYearObj.ending_stocks}
          />
        );

        this.setState({
          searchYears: searchYearDivs
        });

        this.setState({
          comChart: searchYearList
        });

      });

    if (this.state.entityType == "State") {
      fetch("http://localhost:5000/weatherData/" + this.state.selectedEntity,
        {
          method: "GET"
        }).then(res => {
          return res.json();
        }, err => {
          console.log(err);
        }).then(weatherList => {
          let weatherDivs = weatherList.map((weatherObj, i) =>
            <WeatherResultRow month={weatherObj.year}
              temp={weatherObj.temp}
              rainfall={weatherObj.rainfall}
            />
          );

          this.setState({
            monthAvs: weatherDivs
          });

          this.setState({
            weatherChart: weatherList
          });

        });
    }

  }


  render() {
    return (
      <div className="Dashboard">
        <div className="container-fluid">

          <div class="row">


            {/* left panel, containing user input components */}
            <div class="col-4 border-right">
              <div className="search-intro">
                Commodify makes accessing commodities data easy.<br />Please fill in some information so that we can begin the search.
              </div>

              {/* commodity sector selection */}
              <div className="userInput-container">
                <div class="row">
                  <div class="col-1"><h4>1.</h4></div>
                  <div class="col-10"><h4>Which sector are you interested in?</h4></div>
                </div>
                <div className="sectors-container">
                  {this.state.sectors}
                </div>
                <br></br>

                <div className="selection-container">
                  <div>
                    <strong>Selected sector is :</strong> {this.state.selectedSector}
                  </div>
                </div>
              </div>

              {/* select commodity and geography */}
              <div className="userInput-container">
                <div class="row">
                  <div class="col-1"><h4>2.</h4></div>
                  <div class="col-10"><h4>Select commodity and geography.</h4></div>
                </div>

                {/* entity type radio buttons */}
                <div className="commodities-header">
                  <div className="header-lg"><strong>US state or country?</strong></div>
                </div>

                <div className="commodities-options" onChange={this.radioButtonChange}>
                  <div class="row">
                    <div class="col">
                      <input type="radio" value="State" name="stateORcountry" /> US State
                    </div>
                    <div class="col">
                      <input type="radio" value="Country" name="stateORcountry" /> Country
                    </div>
                  </div>


                </div>
                <br />
                {/* commodity dropdown */}
                <div className="commodities-header">
                  <div className="header-lg"><strong>Commodity</strong></div>
                </div>

                <div className=".commodities-container .dropdown">
                  <div className="dropdown-container">
                    <select value={this.state.selectedCommodity} onChange={this.handleChange} className="dropdown" id="commoditiesDropdown">
                      {this.state.commodities}
                    </select>
                  </div>
                </div><br />

                {/* entity dropdown */}
                <div className="commodities-header">
                  <div className="header-lg"><strong>Geography</strong></div>
                </div>

                <div className=".commodities-container .dropdown">
                  <div className="dropdown-container">
                    <select value={this.state.selectedEntity} onChange={this.entitySelection} className="dropdown" id="entitiesDropdown">
                      {this.state.entities}
                    </select>
                  </div>
                </div>

                <br />
                <div className="selection-container">
                  <div>
                    <strong>Selected commodity is :</strong> {this.state.selectedCommodity}<br />
                    <strong>Selected geography is :</strong> {this.state.selectedEntity}
                  </div>
                </div>
              </div>



              <br />

              {/* submit button to begin query */}
              <div className="userInput-container">
                <button type="button" id="submitSelectionsBtn" class="btn btn-dark btn-block" onClick={this.submitOptions}>Submit</button>
              </div>
            </div>

            <div class="col-8">
              <div className="graph-container">
                <h4><strong>Commodity Data</strong></h4>
                <div class="row">
                  <div className="table-container">
                    <LineChart
                      width={800}
                      height={600}
                      responsive={true}
                      maintainAspectRatio={true}
                      data={this.state.comChart}
                      margin={{
                        top: 50,
                        right: 75,
                        left: 0,
                        bottom: 0
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="production"
                        stackId="1"
                        stroke="#3B528BFF"
                        fill="#3B528BFF"
                      />
                      <Line
                        type="monotone"
                        dataKey="consumption"
                        stackId="1"
                        stroke="#21908CFF"
                        fill="#21908CFF"
                      />
                      <Line
                        type="monotone"
                        dataKey="ending_stocks"
                        stackId="1"
                        stroke="#440164FF"
                        fill="#440164FF"
                      />
                    </LineChart>
                    <br />

                  </div>
                </div><br/>
                <div class="selection-container">
              
                    <div class="col-md-1-5">

                      <div className="header"><strong>Year</strong></div>
                      <div className="header"><strong>Production</strong></div>
                      <div className="header"><strong>Consumption</strong></div>
                      <div className="header"><strong>Ending Stocks</strong></div>
                    </div>
                    <div class="col-sm">
                      <div class="searchYears-container">
                        <div className="results-container" id="results">
                          {this.state.searchYears}
                        </div>
                      </div>
                 
                  </div>
                </div>

                <div class="disclaimer">
                  Please note that information for some commodities are not yet available - contact us if you know of reliable data sources and we will incorporate them!
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>











      //     <div className="commodities-header">
      //       <div className="h4"><strong>Climate Data</strong></div>
      //     </div>
      //     <div className="jumbotron-large">

      //       <div className="row">
      //         <div className="col-md-1-5">
      //           <div className="header"><strong>Jan</strong></div>
      //           <div className="header"><strong>Feb</strong></div>
      //           <div className="header"><strong>Mar</strong></div>
      //           <div className="header"><strong>Apr</strong></div>
      //           <div className="header"><strong>May</strong></div>
      //           <div className="header"><strong>Jun</strong></div>
      //           <div className="header"><strong>Jul</strong></div>
      //           <div className="header"><strong>Aug</strong></div>
      //           <div className="header"><strong>Sep</strong></div>
      //           <div className="header"><strong>Oct</strong></div>
      //           <div className="header"><strong>Nov</strong></div>
      //           <div className="header"><strong>Dec</strong></div>
      //         </div>
      //         <div class="col-sm">
      //           <div className="results-container2" id="results2">
      //             {this.state.monthAvs}
      //           </div></div>
      //       </div>

      //     </div>



      //     <LineChart
      //       width={1200}
      //       height={500}
      //       data={this.state.weatherChart}
      //       margin={{
      //         top: 50,
      //         right: 75,
      //         left: 50,
      //         bottom: 0
      //       }}
      //     >
      //       <CartesianGrid strokeDasharray="3 3" />
      //       <XAxis dataKey="year" />
      //       <YAxis />
      //       <Tooltip />
      //       <Line
      //         type="monotone"
      //         dataKey="temp"
      //         stackId="1"
      //         stroke="#FDE725FF"
      //         fill="#FDE725FF"
      //       />
      //       <Line
      //         type="monotone"
      //         dataKey="rainfall"
      //         stackId="1"
      //         stroke="#5DC863FF"
      //         fill="#5DC863FF"
      //       />
      //     </LineChart>

      //   </div>
      // </div>
    );

  }
}
