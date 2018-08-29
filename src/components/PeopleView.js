import React, { Component } from "react";
import { API } from "../libs/amplify";
import NoteMarker from "./NoteMarker.js";

export default class PeopleView extends Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    var isTrueSet = (localStorage.helpOthers == 'true');
    this.state = {
      isLoading: true,
      visible: isTrueSet,
    };
    this.notes = [];
  }

  loadNotes() {
    this.setState({isLoading: true})
    API.get('notes', '/notes').then(
      Response => this.notes = Response,
      Refused => console.log(Refused)
    ).then(
      () => this.setState({isLoading: false})
    )
  }

  async componentDidMount() {
    this.loadNotes();
  }

  render() {
    return (this.notes.length === 0 || this.state.isLoading) ? <span>Loading...</span>
      : !this.state.visible ? <span></span>
      : this.notes.filter(note => note.content && note.content.lat && note.content.lng)
        .map(note => <NoteMarker key={note.noteId} note={note} history={this.history}/>);
  }
}
