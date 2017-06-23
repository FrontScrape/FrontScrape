import React, { Component } from "react";
import API from "../utils/API";

class PanelFavorites extends Component {
	// constructor() {
	// 	super();
	// 	this.deleteArticle = this.deleteArticle.bind(this);
	// }
	// deleteArticle() {
	// 	API.deleteArticle(this.props.id).then(this.props.getSaved);
	// }
	render() {
		return (
			<div>
				<p>PanelFavorites - Testing</p>
			</div>
		);
	}
}

export default PanelFavorites;

			// <div className="panel panel-default">
	  // 			<div className="panel-body">
	  //   			<h4 id="savedListing">
	  //   				<a href={this.props.saved.url} target="_blank">{this.props.saved.title}</a>
		 //    			<button
		 //    				id="deleteButton"
		 //    				className="btn btn-danger"
		 //    				onClick={this.deleteArticle}
		 //    			>
		 //    				Delete
		 //    			</button>
	  //   			</h4>
	  //   			<p>Date Saved: {moment(this.props.saved.saveDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
	  // 			</div>
			// </div>