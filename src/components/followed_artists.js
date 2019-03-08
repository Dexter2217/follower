//The container that will render a list of artists.
// - ActionCreators: Will call an action creator that will update the state with the user's spotify followed artists.
//   This will be fetched during componentDidMount

//Import modules
import _ from "lodash";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFollowedArtists } from "../actions";


class FollowedArtists extends Component {
    componentDidMount () {
        //Fetch the data via this.props.fetchFollowedArtists
        console.log("fetched followed artists:");
        this.props.fetchFollowedArtists();
    }
    renderArtists () {
        //Return concatenated <li>'s for each artist
        //Access the followed_artists state property via
        //this.props.followed_artists

        //Loop through each artist and return an <li> for each one
        var artists = (typeof this.props.followedArtists === "undefined") ? {} : this.props.followedArtists;

        return _.map(artists, artist => {
            return (
                <li key={artist.name}>{artist.name}</li>
            );
        });
    }

    render () {
        //returns DOM wrapper and calls this.renderArtists()

        return ( 
            <ul className="list-group">
                {this.renderArtists()}
            </ul>
        );
    }
    
}
function mapStateToProps(state) {
    return { followedArtists: state.followedArtists };
}
export default connect(mapStateToProps, {fetchFollowedArtists})(FollowedArtists);