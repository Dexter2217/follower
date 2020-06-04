import React, { Component } from 'react';
import FollowedArtists from './followed_artists';
import Artist from './Artist';
import '../scss/Dashboard.scss';

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