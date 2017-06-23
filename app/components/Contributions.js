import React, { Component } from 'react';
import API from '../utils/API';

class Contributions extends Component {
	constructor() {
		super();
		this.state = {
			contributionScore: 'Please log in to see!'
		}
	// 	// this.getArticles = this.getArticles.bind(this);
	// 	this.getSaved = this.getSaved.bind(this);
	// 	this.renderArticles = this.renderArticles.bind(this);
	}
	componentWillMount() {

		// if (this.props.email) {
		// 	API.getContributionScore(this.props.email).then((res) => {
		// 		this.setState({contributionScore: res.data});
		// 	});
		// }

	}
	componentWillReceiveProps(nextProps) {
		// console.log('TAG');
		// this.getArticles();

		if (nextProps.email) {
			API.getContributionScore(nextProps.email).then((res) => {
				this.setState({contributionScore: res.data});
			});
		}
	}
	// getSaved() {
	// 	this.props.getSaved();
	// }
	// renderArticles() {
	// 	return this.state.articles.map(article => (
	// 		<Panel1
	// 			article={article}
	// 			key={article._id}
	// 			getSaved={this.getSaved}
	// 		/>
	// 	));
	// }
	render() {
		return (
			<div className="container-fluid scrapeIndividual col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
				<div className="card text-center">
				  <div className="card-header">
				    Your Pages Scraped
				  </div>
				  <div className="card-block">
				    <h1>{this.state.contributionScore}</h1>
				  </div>
				</div>
			</div>
		);
	}
}

export default Contributions;

				// <div className="panel panel-default">
				//   	<div className="panel-heading">
				//     	<h3 className="panel-title">Results</h3>
				//   	</div>
				//   	<div className="panel-body">
				//   		{this.renderArticles()}
				//   	</div>
				// </div>