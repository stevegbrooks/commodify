import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class CommodityRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="commodity">
				<div className="name">{this.props.commodity.name}</div>
			</div>
		);
	}
}
