import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { connect } from "react-redux";

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
    render() {
      return (
        <div>
            <Container>
                <Row>
                    <span>{this.props.currentArtist.name}</span>
                </Row>
                <Row>
                    <ul className="artist__genre-list">
                        {this.renderGenres()}
                    </ul>
                </Row>
                <Row>
                    <span><a href={this.props.currentArtist.href}>Listen</a></span>
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