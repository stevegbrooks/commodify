import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class GroupButton extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			id
			onClick
			genre
		}
		*/
	}

	render() {
		return (
			<div className="group" id={this.props.id} onClick={this.props.onClick}>
			{this.props.group}
			</div>
		);
	}
}
