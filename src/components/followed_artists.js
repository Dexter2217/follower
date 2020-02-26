//The container that will render a list of artists.
// - ActionCreators: Will call an action creator that will update the state with the user's spotify followed artists.
//   This will be fetched during componentDidMount

//Import modules
import _ from "lodash";
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchFollowedArtists, selectArtist } from "../actions";
import Pagination from './Pagination';
import Search from './Search';
import '../css/FollowedArtists.css';
const ARTIST_PER_PAGE = 10;

const selectFollowedArtist = (state) => {
    let artists = (typeof state.followedArtists === "undefined") ? {} : state.followedArtists;
    return Array.from(artists).filter((artist) => matchesSearchTerm(artist, state.currentSearchTerm));
}

const matchesSearchTerm = (artist, term) => {
    let artistName = artist.name.toUpperCase();
    return (typeof term !== 'undefined') ? artistName.includes(term.toUpperCase()) : true;
}

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
        let artists = (typeof this.props.followedArtists === "undefined") ? {} : this.props.followedArtists;
        let startingPoint = this.props.currentPage * ARTIST_PER_PAGE;
        let artistGroup = artists.slice(startingPoint, startingPoint + ARTIST_PER_PAGE);
        return _.map(artistGroup, artist => {
            return (
                <p key={artist.name} onClick={() => {this.props.selectArtist(artist)}}>{artist.name}</p>
            );
        });
    }

    render () {
        //returns DOM wrapper and calls this.renderArtists()
        var maxPageCount = this.getMaxPageCount();

        return (
            <Fragment>
                <Search followedArtists={this.props.followedArtists}/>
                <div className="followed-artists">
                    {this.renderArtists()}
                    <Pagination maxPageCount={maxPageCount}/>
                </div>
            </Fragment>
        );
    }
}
function mapStateToProps(state) {
    return {
        followedArtists: selectFollowedArtist(state),
        currentPage: state.currentPage,
        currentSearchTerm: state.currentSearchTerm
    };
}
export default connect(mapStateToProps, {fetchFollowedArtists, selectArtist})(FollowedArtists);