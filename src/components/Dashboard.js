import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FollowedArtists from './Followed_Artists';
import Artist from './Artist';

class Dashboard extends Component {
    render() {
      return (
        <div>
            <h1>Dashboard</h1>
            <Container>
                <Row>
                    <Col><Artist/></Col>
                    <Col><FollowedArtists/></Col>
                </Row>
            </Container>;
        </div>
      );
    }
  }
  
  export default Dashboard;