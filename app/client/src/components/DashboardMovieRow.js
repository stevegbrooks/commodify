import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardMovieRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movie">
				<div className="title">{this.props.movie.title}</div>
				<div className="rating">{this.props.movie.rating}</div>
				<div className="votes">{this.props.movie.vote_count}</div>
			</div>
		);
	}
}
