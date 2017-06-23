import React, {Component} from 'react';
import Navbar from "./common/Navbar";
import Query from './Query';
import Stats from './Stats';
import Results from './Results';
import Footer from "./common/Footer";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			email: ''
		}
		// this.getSaved = this.getSaved.bind(this);
		this.setParentQuery = this.setParentQuery.bind(this);
		this.setParentEmail = this.setParentEmail.bind(this);
	}
	// getSaved() {
	// 	this.child.getSaved();
	// }
	setParentQuery(query) {
		this.setState({
			query: query
		});
	}
	setParentEmail(email) {
		this.setState({
			email: email
		});
	}
	render() {
		if (!this.state.query.length) {
			return (
				<div className="site d-flex flex-column container-fluid">
					<Navbar setParentEmail={this.setParentEmail}/>
					<br/>
					<br/>
					<div className="main flex-grow container-fluid">
						<Query
							query={this.state.query}
							setParentQuery={this.setParentQuery}/>
						<br/>
						<Stats email={this.state.email}/>
					</div>
					<br/>
					<Footer />
				</div>
			);
		} else if (this.state.query.length) {
			return (
				<div className="site d-flex flex-column container-fluid">
					<Navbar setParentEmail={this.setParentEmail}/>
					<br/>
					<div className="main flex-grow container-fluid">
						<Query
							query={this.state.query}
							setParentQuery={this.setParentQuery}/>
						<br/>
						<Results query={this.state.query}/>
					</div>
					<br/>
					<Footer />
				</div>
			);
		}
	}
}

export default Main;

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         document.getElementById("myBtn").style.display = "block";
//     } else {
//         document.getElementById("myBtn").style.display = "none";
//     }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//     document.body.scrollTop = 0; // For Chrome, Safari and Opera 
//     document.documentElement.scrollTop = 0; // For IE and Firefox
// }

// <button onClick={topFunction} id="myBtn" title="Go Back to Top">Back to Top</button>

					// <br/>
					// <Results query={this.state.query}/>

						// {this.props.children}

// setParent={this.setParent}
// setParent={this.setParent}