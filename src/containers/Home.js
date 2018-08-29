import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { ButtonToolbar, Button } from "react-bootstrap";
import DemandMarker from "../components/DemandMarker.js";
import PeopleView from '../components/PeopleView.js';
import "./Home.css";

export default class Home extends Component {
  handleMapClick(e) {
    this.demandMarker.setState({position: { lat: e.latLng.lat(), lng: e.latLng.lng()}});
  }

  setHelpOthers(helpOthers) {
    this.peopleView.setState({visible: helpOthers});
    this.demandMarker.setState({visible: !helpOthers});
    localStorage.helpOthers = helpOthers;

    if (helpOthers) {
      this.peopleView.loadNotes();
    } else if (!this.demandMarker || !this.demandMarker.state.position) {
      alert("Can find your location, please click the location manully before ask for help");
    } else {
      this.demandMarker.handleDemandClick();
    }
  }

  askForHelp() {
  }

  renderMap() {
    const MapWithMarkers = withScriptjs(withGoogleMap(props =>
      <GoogleMap 
        defaultZoom={12} 
        defaultCenter={{ lat: -43.5250716, lng: 172.5822643 }} 
        onClick={(e)=>this.handleMapClick(e)}
        options={{
          mapTypeControl: false,
          overviewMapControl: false,
          streetViewControl: false,
          panControl: false,
          zoomControl: false
        }}
      >
        <PeopleView ref={v => {this.peopleView = v}} history={this.props.history} />
        <DemandMarker ref={v => {this.demandMarker = v}} history={this.props.history} />
      </GoogleMap>
    ));

    return (
      <div className="Home">
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={()=>this.setHelpOthers(false)}>Ask for help</Button>
        <Button bsStyle="success" onClick={()=>this.setHelpOthers(true)}>Help Others</Button>
      </ButtonToolbar>
        {
          <MapWithMarkers
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqyxV-9TUWmyVP27xwIuhV2lKLh8-gpas&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `${window.innerHeight - 150}px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        }
      </div>
    );
  }


  renderLander() {
    return (
      <div className="lander">
        <h1>Kiwis Help</h1>
        <p>Kiwis Help - Mindstorm</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderMap() : this.renderLander()},
      </div>
    );
  }
}