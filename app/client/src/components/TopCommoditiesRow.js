import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TopComsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="topcomsResults">
				<div className="country">{this.props.country}</div>
				<div className="commodity">{this.props.commodity}</div>
				<div className="year">{this.props.year}</div>
				<div className="month">{this.props.month}</div>
				<div className="ending_stocks">{this.props.ending_stocks}</div>
			</div>
		);
	}
}