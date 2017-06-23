import React, { Component } from "react";
import API from "../utils/API";

class PanelResults extends Component {
	constructor() {
		super();
	// 	this.saveArticle = this.saveArticle.bind(this);
	// }
	// saveArticle() {
	// 	API.saveArticle(this.props.article.headline.main, this.props.article.web_url).then(this.props.getSaved);
	}
	render() {
		return (
		  <div key={this.props.result.key} className="card-block">
		    <h4 id="resultTitle" className="card-title"><a href={this.props.result.pageurl} target="_blank">{this.props.result.title}</a></h4>
		    <p id="resultURL" className="card-text">{this.props.result.pageurl}</p>
		  </div>
		);
	}
}

export default PanelResults;

			// <div className="panel panel-default">
	  // 			<div className="panel-body">
	  //   			<h4 id="resultListing">
	  //   				<a href={this.props.article.web_url} target="_blank">{this.props.article.headline.main}</a>
		 //    			<button
		 //    				id="saveButton"
		 //    				className="btn btn-primary"
		 //    				onClick={this.saveArticle}
		 //    			>
		 //    				Save
		 //    			</button>
	  //   			</h4>
	  // 			</div>
			// </div>