import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SectorButton from './SectorButton';
import SearchResultRow from './SearchResultRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of sectors,
    // and a list of commodities for a specified sector.
    this.state = {
      genres: [],
      commodities: [],
      entities: [],
      selectedCommodity: "",
      selectedEntity: "",
      results: [],
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
    }).then(genreList => {
      if (!genreList) return;
      // Map each sector in this.state.sectors to an HTML element:
      // A button which triggers the showCommodities function for each sector.
      let genreDivs = genreList.map((genreObj, i) =>
	    <SectorButton id={"button-" + genreObj.group_name} onClick={() => this.showCommodities(genreObj.group_name)} genre={genreObj.group_name} /> );

      // Set the state of the sectors list to the value returned by the HTTP response from the server.
      this.setState({
        genres: genreDivs
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
    var searchTerms = [this.state.selectedCommodity, this.state.selectedEntity]
    // Send an HTTP request to the server.
    fetch("http://localhost:5000/histData/" + searchTerms,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(resultList => {
      if (!resultList) return;
      let resultDivs = resultList.map((resultObj, i) =>
      <SearchResultRow title={resultObj.title} rating={resultObj.rating} vote_count={resultObj.vote_count}  />
      );
    
    
      // Set the state of the movies list to the value returned by the HTTP response from the server.
      this.setState({
        results: resultDivs
      });
    }, err => {
    // Print the error if there is one.
    console.log(err);
    });
  }



  render() {    
    return (
      <div className="Dashboard">

        {/* displays the sectors */}
        <br></br>
        <div className="container sectors-container">
          <div className="jumbotron">
            <div className="h5"><strong>Which sector do you want to search?</strong></div>
            <div className="genres-container">
              {this.state.genres}
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



            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>Year</strong></div>
                <div className="header"><strong>Production</strong></div>
                <div className="header"><strong>Domestic consumption</strong></div>
                <div className="header"><strong>Ending stocks</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.movies}
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}
