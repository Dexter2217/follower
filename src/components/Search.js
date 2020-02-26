import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateSearchTerm, updateFollowedArtists} from '../actions';
import "../css/Search.css";

class Search extends Component {
    handleChange (event) {
        //Update the current_search_term state value with whatever is in the input field
        let term = event.currentTarget.value;
        this.props.updateSearchTerm(term);

        // let artists = (typeof this.props.followedArtists === "undefined") ? {} : this.props.followedArtists;
        // let filteredArtists = Array.from(artists).filter((artist) => this.matchesSearchTerm(artist, term));
        // this.props.updateFollowedArtists(filteredArtists);

        // let startingPoint = this.props.currentPage * ARTIST_PER_PAGE;
        // let artistGroup = filteredArtists.slice(startingPoint, startingPoint + ARTIST_PER_PAGE);
    }
    filterArtistList (artists, term) {
        //LEFT OFF HERE!
    }
    matchesSearchTerm (artist, term) {
        let artistName = artist.name.toUpperCase();
        return artistName.includes(term.toUpperCase());
        //return artistName.includes(this.props.current_search_term.toUpperCase());
    }
    render () {
        return (<input className="search-bar" type='text' placeholder="search..." onChange={(event) => {this.handleChange(event)}}/>);
    }
}

function mapStateToProps (state) {
    return {
        current_search_term: state.current_search_term,
        currentPage: state.currentPage
    }
}

export default connect(mapStateToProps, {updateSearchTerm, updateFollowedArtists})(Search);