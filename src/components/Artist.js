import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import "../css/Artist.css";

//This container just needs to read the currentArtist state. So it should probably accept the "prop"
// of currentArtist.
class Artist extends Component {
    renderGenres() {
        return this.props.currentArtist.genres.map((genre, index) => {
            return (
                <li key={index}>{genre}</li>
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
        <div>
            <Container>
                <Row>
                    <div>
                        <img className="artist-hero-image" alt="current artist" src={this.getImage()}/>
                    </div>
                </Row>
                <Row>
                    <span>{this.props.currentArtist.name}</span>
                </Row>
                <Row>
                    <ul className="artist__genre-list">
                        {this.renderGenres()}
                    </ul>
                </Row>
                <Row>
                    <span><a href={this.props.currentArtist.uri}>Listen</a></span>
                </Row>
            </Container>
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