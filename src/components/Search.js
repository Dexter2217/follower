import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateSearchTerm, updateFollowedArtists, setPage} from '../actions';
import "../scss/Search.scss";

class Search extends Component {
    handleChange (event) {
        //Update the current_search_term state value with whatever is in the input field
        let term = event.currentTarget.value;
        this.props.updateSearchTerm(term);
        this.props.setPage(0);
    }
    matchesSearchTerm (artist, term) {
        let artistName = artist.name.toUpperCase();
        return artistName.includes(term.toUpperCase());
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

export default connect(mapStateToProps, {updateSearchTerm, updateFollowedArtists, setPage})(Search);