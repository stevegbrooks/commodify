import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class SearchResultRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="searchResults">
				<div className="year">{this.props.year}</div>
				<div className="beginning_stocks">{this.props.beginning_stocks}</div>
				<div className="production">{this.props.production}</div>
				<div className="consumption">{this.props.consumption}</div>
				<div className="ending_stocks">{this.props.ending_stocks}</div>
			</div>
		);
	}
}
