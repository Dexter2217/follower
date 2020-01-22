//The container that will render a list of artists.
// - ActionCreators: Will call an action creator that will update the state with the user's spotify followed artists.
//   This will be fetched during componentDidMount

//Import modules
import _ from "lodash";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFollowedArtists, selectArtist } from "../actions";
import Pagination from './Pagination';
const ARTIST_PER_PAGE = 10;

class FollowedArtists extends Component {
    componentDidMount () {
        //Fetch the data via this.props.fetchFollowedArtists
        console.log("fetched followed artists:");
        this.props.fetchFollowedArtists();
    }
    getMaxPageCount () {
        // Calculate the MaxPageCount via this.props.followedArtists
        let artistTotal = this.props.followedArtists.length;
        return Math.ceil(artistTotal / ARTIST_PER_PAGE) - 1;
    }
    renderArtists () {
        //Return concatenated <li>'s for each artist
        //Access the followed_artists state property via
        //this.props.followed_artists

        //Loop through each artist and return an <li> for each one
        var artists = (typeof this.props.followedArtists === "undefined") ? {} : this.props.followedArtists;
        let startingPoint = this.props.currentPage * ARTIST_PER_PAGE;
        var artistGroup = artists.slice(startingPoint, startingPoint + ARTIST_PER_PAGE);

        return _.map(artistGroup, artist => {
            return (
                <li key={artist.name} onClick={() => {this.props.selectArtist(artist)}}>{artist.name}</li>
            );
        });
    }

    render () {
        //returns DOM wrapper and calls this.renderArtists()
        var maxPageCount = this.getMaxPageCount();

        return (
            <div>
                <ul className="list-group">
                    {this.renderArtists()}
                </ul>
                <Pagination maxPageCount={maxPageCount}/>
            </div>
        );
    }
    
}
function mapStateToProps(state) {
    return { followedArtists: state.followedArtists, currentPage: state.currentPage };
}
export default connect(mapStateToProps, {fetchFollowedArtists, selectArtist})(FollowedArtists);