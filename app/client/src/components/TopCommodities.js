import React, { Component } from 'react'
import TopComsRow from './TopCommoditiesRow';
import '../style/TopCommodities.css';

class TopCommodities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topcoms: []
    }
  }
    
  componentDidMount() {
    
    fetch("http://localhost:5000/topcoms",
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(topcomsList => {
      if (!topcomsList) return;
      console.log(topcomsList);
      let topcomsDivs = topcomsList.map((topcomsObj, i) =>
        <TopComsRow country = {topcomsObj.country} 
                    commodity = {topcomsObj.commodity} 
                    year = {topcomsObj.year}
                    month = {topcomsObj.month}
                    ending_stocks = {topcomsObj.ending_stocks}/>
      );
      // Set the state of the genres list to the value returned by the HTTP response from the server.
			this.setState({
				topcoms : topcomsDivs
			});
    });
  }
    
  render() {
    return (
			<div className="TopCommodities">
				<div className="topcoms-container">
          <div className="topcoms">
            <div className="header"><strong>Country</strong></div>
            <div className="header"><strong>Commodity</strong></div>
            <div className="header"><strong>Year</strong></div>
            <div className="header"><strong>Month</strong></div>
            <div className="header"><strong>Ending Stocks</strong></div>
          </div>
          <div className="topcoms-container" id="results">
            {this.state.topcoms}
          </div>
        </div>
			</div>
    )
  }
}
export default TopCommodities
