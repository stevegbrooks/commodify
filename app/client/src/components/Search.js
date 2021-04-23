import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SectorButton from './SectorButton';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of sectors,
    // and a list of commodities for a specified sector.
    this.state = {
      genres: [],
      commodities: [],
      selectedCommodity: "",
      selectedOption: ""
    }

    this.showCommodities = this.showCommodities.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption)
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


	submitCommodity() {
		
	}



  render() {    
    return (
      <div className="Dashboard">

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Which sector do you want to search?</div>
            <div className="genres-container">
              {this.state.genres}
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="commodities-container">
              <div className="commodities-header">
                <div className="header-lg"><strong>Commodity</strong></div>
              </div>
              <div className="commodities-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedCommodity} onChange={this.handleChange} className="dropdown" id="commoditiesDropdown">
			            	{this.state.commodities}
			            </select>
			            <button className="submit-btn" id="commoditiesSubmitBtn" onClick={this.submitCommoditiy}>Submit</button>
			          </div>

			        </div>
              <div className="commodities-header">
                <div className="header-lg"><strong>Entity</strong></div>
              </div>

              <form onSubmit={this.formSubmit}>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="State"
                      checked={this.state.selectedOption === "State"}
                      onChange={this.onValueChange}
                    />
                    State
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="Country"
                      checked={this.state.selectedOption === "Country"}
                      onChange={this.onValueChange}
                    />
                    Country
                  </label>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
