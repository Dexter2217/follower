import React, { Component } from 'react';
import FollowedArtists from './Followed_Artists';
import Artist from './Artist';
import '../css/Dashboard.css';

class Dashboard extends Component {
    render() {
      return (
        <div>
            <div className="dashboard">
                <Artist/>
                <div className="dashboard__right-rail">
                  <FollowedArtists/>
                </div>
            </div>
            <img className='brand-logo' alt='spotify logo' src='../../images/Spotify_Logo_RGB_Green.png'/>
        </div>
      );
    }
  }
  export default Dashboard;