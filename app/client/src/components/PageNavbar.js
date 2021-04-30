import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/NavBar.css'
import { Link } from 'react-router-dom'

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		const pageList = ['Dashboard', 'Search'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})

		this.setState({
			navDivs: navbarDivs
		});
	}

	render() {
		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="logo-image">
						<a href =".\">
						<img src="commodify_navbar_logo.png" class="img-fluid"></img>
						</a>						

					</div>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav"> 
						{this.state.navDivs} 
					</div>
			      </div>
			    </nav>
			</div>
        );
	}
}