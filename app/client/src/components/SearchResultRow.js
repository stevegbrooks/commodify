import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class SearchResultRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="searchResult">
				<div className="year">{this.props.searchResult.year}</div>
				<div className="beginning_stocks">{this.props.searchResult.beginning_stocks}</div>
				<div className="production">{this.props.searchResult.production}</div>
				<div className="imports">{this.props.searchResult.imports}</div>
				<div className="domestic_consumption">{this.props.searchResult.domestic_consumption}</div>
				<div className="exports">{this.props.searchResult.exports}</div>
				<div className="ending_stocks">{this.props.searchResult.ending_stocks}</div>
			</div>
		);
	}
}
