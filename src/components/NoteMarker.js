import React, { Component } from "react";
import { Marker } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import './NoteMarker.css';
import logo from './logo.svg';
import photo from './photo.png';

export default class NoteMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLabel: false,
        };
        this.history = props.history;
        this.note = props.note;

        this.icon = this.note.content.helperName ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
    }

    answerRequest() {
        this.history.push(`/answer`, this.note);
    }
    
    render() {
        return <Marker position={{ lat: this.note.content.lat, lng: this.note.content.lng}} 
                    onClick={ ()=> this.state.showLabel ? this.answerRequest() : this.setState({showLabel: true})}
                    onMouseOver={ ()=> this.setState({showLabel: true })}
                    onMouseOut={ ()=> this.setState({showLabel: false })}
                    icon= {this.icon}
            >
            {   this.state.showLabel &&
                <InfoBox options={{ closeBoxURL: '', enableEventPropagation: true }} onClick={ ()=> this.editNote()}>
                    <div className="note">
                        <div className="note"> {this.note.content.name} </div>
                        <div className="note"> {this.note.content.complaint} </div>
                        <img className="logo" src={logo} alt="spin"/>
                        <img className="photo" src={photo} alt="me"/>
                    </div>
                </InfoBox>
            }
            </Marker>;
    }        
}
