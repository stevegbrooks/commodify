import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SectorButton extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			id
			onClick
			sector
		}
		*/
	}

	render() {
		return (
			<div className="sector" id={this.props.id} onClick={this.props.onClick}>
			{this.props.sector}
			</div>
		);
	}
}
