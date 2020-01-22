import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incrementPage, decrementPage} from '../actions';

class Pagination extends Component {
    render() {
        let currentPage = this.props.currentPage;
        let nextButton = (currentPage < this.props.maxPageCount) ? <span onClick={() => this.props.incrementPage(currentPage)}>next</span> : "";
        let prevButton = (currentPage > 0) ? <span onClick={() => this.props.decrementPage(currentPage)}>prev</span> : "";
        return (
            <div>
                {prevButton}<span>{this.props.currentPage}</span>{nextButton}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {currentPage: state.currentPage};
}
export default connect(mapStateToProps, {incrementPage, decrementPage})(Pagination);