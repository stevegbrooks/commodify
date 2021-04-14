import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SectorButton from './SectorButton';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
    }

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
      // Map each genre in this.state.genres to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let genreDivs = genreList.map((genreObj, i) =>
	<SectorButton id={"button-" + genreObj.group_name} onClick={() => this.showSearchOptions(genreObj.group_name)} genre={genreObj.group_name} /> );

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        genres: genreDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
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

          
        </div>
      </div>
    );
  }
}
