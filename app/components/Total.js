import React, { Component } from 'react';
import API from '../utils/API';

class Total extends Component {
	constructor() {
		super();
		this.state = {
			totalScore: 0
		}
	// 	// this.getArticles = this.getArticles.bind(this);
	// 	this.getSaved = this.getSaved.bind(this);
	// 	this.renderArticles = this.renderArticles.bind(this);
	// }
	}
	componentWillMount() {
		// API.getScrapeTotal().then((res) => {
		// 	this.setState({scrapeTotal: res});
		// });
	}
	componentWillReceiveProps() {
		// console.log('TAG');
		// this.getArticles();

		API.getTotalScore().then((res) => {
			this.setState({totalScore: res.data});
		});

		setInterval(() => {API.getTotalScore().then((res) => {
			this.setState({totalScore: res.data});
		});}, 5000);
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
			<div className="container-fluid scrapeTotal col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
				<div className="card text-center">
				  <div className="card-header">
				    Total Pages Scraped 
				  </div>
				  <div className="card-block">
				    <h1>{this.state.totalScore}</h1>
				  </div>
				</div>
			</div>
		);
	}
}

export default Total;

				// <div className="panel panel-default">
				//   	<div className="panel-heading">
				//     	<h3 className="panel-title">Results</h3>
				//   	</div>
				//   	<div className="panel-body">
				//   		{this.renderArticles()}
				//   	</div>
				// </div>