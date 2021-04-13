import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'

class Search extends Component {
  render() {
    
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="jumbotron">
            <div className="input-container">
            <div className="h5">What sector do you want to search?</div>
			    	</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search