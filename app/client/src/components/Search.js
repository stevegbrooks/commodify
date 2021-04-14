import React, { Component } from 'react'
import GroupButton from './GroupButton';

class Search extends Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of commodity groups.
    this.state = {
      commodity_groups: []
    }

    this.showSearchOptions = this.showSearchOptions.bind(this);
  
  }

  // React function that is called when the page loads.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/commodity_groups",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(groupList => {
      if (!groupList) return;
      // Map each commodity group in this.state.commodity_groups to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let groupDivs = groupList.map((groupObj, i) =>
	<GroupButton id={"button-" + groupObj.group} onClick={() => this.showSearchOptions(groupObj.group)} group={groupObj.group_name} /> );

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        groups: groupDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  showSearchOptions(group) {
    
  }


  render() {
    
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="jumbotron">
            <div className="input-container">
            <div className="h5">What sector do you want to search?</div>
            <div className="commodity_groups-container">
              {this.state.commodity_groups}
            </div>
			    	</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search