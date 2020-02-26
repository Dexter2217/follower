import React, { Component } from 'react';
import { connect } from "react-redux";
import "../css/Artist.css";

//This container just needs to read the currentArtist state. So it should probably accept the "prop"
// of currentArtist.
class Artist extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//currentImageIndex: 0
		};
	}
	renderGenres() {
		return this.props.currentArtist.genres.map((genre, index) => {
			return (
				<p key={index}>{genre}</p>
			);
		});
	}
	getImage() {
		var currentImageUrl = (this.props.currentArtist.images && this.props.currentArtist.images.length > 0) ? 
			this.props.currentArtist.images[0].url :
			"/images/default-artist-image.png";
		return currentImageUrl;

	}
	render() {
		return (
		<div className="artist">
			<h2>{this.props.currentArtist.name}</h2>
			<div className="artist__image-container">
				<img className="artist__image" alt="current artist" src={this.getImage()}/>
			</div>
			<div className="artist__info">
				<h3>Genres</h3>
				<div className="artist__genre-list">
					{this.renderGenres()}
				</div>
				<span><a href={this.props.currentArtist.uri}>Listen</a></span>
			</div>
		</div>
	  );
	}
  }

function mapStateToProps(state) {
	return {
		currentArtist: state.currentArtist
	};
}
export default connect(mapStateToProps)(Artist);