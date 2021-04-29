import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class WeatherResultRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="weatherSearchResults">
				<div className="month">{this.props.year}</div>
				<div className="temp">{this.props.temp}</div>
				<div className="rainfall">{this.props.rainfall}</div>
			</div>
		);
	}
}
