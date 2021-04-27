import React, { Component } from 'react';
import '../style/Search.css';
import SectorButton from './SectorButton';
import SearchResultRow from './SearchResultRow';

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
      name: "React"
    }

    this.showCommodities = this.showCommodities.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.radioButtonChange = this.radioButtonChange.bind(this);
    this.entitySelection = this.entitySelection.bind(this);
    this.submitOptions = this.submitOptions.bind(this);

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
	    <SectorButton id={"button-" + sectorObj.group_name} onClick={() => this.showCommodities(sectorObj.group_name)} sector={sectorObj.group_name} /> );

      // Set the state of the sectors list to the value returned by the HTTP response from the server.
      this.setState({
        sectors: sectorDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }



  showCommodities(sector) {
    // Send an HTTP request to the server.
    fetch("http://localhost:5000/commodities/" + sector,
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

			if(commodityList.length > 0) {
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
	}

  radioButtonChange(event) {
    console.log(event.target.value);
    this.setState({
      entityType: event.target.value
    });
    
    fetch("http://localhost:5000/entities/" + event.target.value,
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

			if(entityList.length > 0) {
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
				<SearchResultRow year = {searchYearObj.year}
          beginning_stocks = {searchYearObj.beginning_stocks}
          production = {searchYearObj.production}
          consumption = {searchYearObj.consumption}
          ending_stocks = {searchYearObj.ending_stocks}
        />
			);

			this.setState({
				searchYears: searchYearDivs
			});
		});
	}


  render() {    
    return (
      <div className="Search">

        {/* displays the sectors */}
        <br></br>
        <div className="search-container">
          <div className="jumbotron">
            <div className="h5"><strong>Which sector do you want to search?</strong></div>
            <div className="sectors-container">
              {this.state.sectors}
            </div>
          </div>

          {/* selections section */}
          <br></br>
          <div className="jumbotron">
            <div className="commodities-container">

              {/* commodity dropdown */}
              <div className="commodities-header">
                <div className="header-lg"><strong>Commodity</strong></div>
              </div>
              <div className="commodities-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedCommodity} onChange={this.handleChange} className="dropdown" id="commoditiesDropdown">
			            	{this.state.commodities}
			            </select>
			          </div>
                <div>
                  Selected option is : {this.state.selectedCommodity}
                </div>
			        </div>

              {/* entity type radio buttons */}
              <br></br>
              <div className="entityType-header">
                <div className="header-lg"><strong>State or Country?</strong></div>
              </div>
              <div onChange={this.radioButtonChange}>
                <input type="radio" value="State" name="stateORcountry" /> State
                <input type="radio" value="Country" name="stateORcountry" /> Country
              </div>
              <div>
                Selected option is : {this.state.entityType}
              </div>

              {/* entitity dropdown */}
              <br></br>
              <div className="commodities-header">
                <div className="header-lg"><strong>{this.state.entityType}</strong></div>
              </div>
			        <div className="dropdown-container">
			          <select value={this.state.selectedEntity} onChange={this.entitySelection} className="dropdown" id="entitiesDropdown">
			          	{this.state.entities}
			          </select>
			        </div>
              <div>
                Selected option is : {this.state.selectedEntity}
              </div>

              {/* submission */}
              <button id="submitSelectionsBtn" className="submit-btn" onClick={this.submitOptions}>Submit</button>


            </div>
          </div>

				<div className="results-container">
          <div className="results">
            <div className="header"><strong>Year</strong></div>
            <div className="header"><strong>Beginning Stocks</strong></div>
            <div className="header"><strong>Production</strong></div>
            <div className="header"><strong>Domestic Consumption</strong></div>
            <div className="header"><strong>Ending Stocks</strong></div>
          </div>
          <div className="results-container" id="results">
            {this.state.searchYears}
          </div>
        </div>


        </div>

        

      </div>
    );
  }
}
