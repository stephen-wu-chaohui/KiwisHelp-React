import React, { Component } from "react";
import { Marker } from "react-google-maps";
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import "./DemandMarker.css";
import logo from "./logo.svg";
import photo from "./photo.png";

/* global google */

export default class DemandMarker extends Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    this.demandNote = { content: {} };

    this.state = {
      visible: true
    };
  }

  async componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.setState({position: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }});
      });
    }
  }

  handleDemandClick() {
    this.demandNote.content.lat = this.state.position.lat;
    this.demandNote.content.lng = this.state.position.lng;
    this.history.push(`/ask`, this.demandNote);
  }

  changePosition(pos) {
    this.demandNote.content.lat = pos.lat;
    this.demandNote.content.lng = pos.lng;
    this.setState({ position: pos });
  }

  render() {
    return this.state.position && this.state.visible ? (
      <Marker
        position={this.state.position}
        animation={google.maps.Animation.DROP}
        icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        onClick={() => this.handleDemandClick()}
      >
        <InfoBox>
          {this.demandNote.content.name ? (
            <div className="note">
              <h1 className="note"> {this.demandNote.content.name} says: </h1>
              <h2 className="note"> {this.demandNote.content.complaint} </h2>
              <img className="logo" src={logo} alt="spin" />
              <img className="photo" src={photo} alt="me" />
            </div>
          ) : (
            <div className="note">You are here</div>
          )}
        </InfoBox>
      </Marker>
    ) : (
      ""
    );
  }
}
