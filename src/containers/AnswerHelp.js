import React, { Component } from "react";
import { API } from "../libs/amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./AnswerHelp.css";
import dateformat from "dateformat";

export default class AnswerHelp extends Component {
  constructor(props) {
    super(props);

    this.note = props.location.state || { content : {}};

    this.state = {
        isLoading: null,
        helperName: this.note.content.helperName || '',
        comments: this.note.content.comments || '',
    };
  }


  validateForm() {
    return this.state.helperName && this.state.helperName.length > 0;
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
    try {
      this.note.content.helperName = this.state.helperName;
      this.note.content.comments = this.state.comments;
      this.note.content.answeredTime = Date.now();
      await this.commitAnswer();
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
    this.props.history.push("/");
  }

  commitAnswer() {
    API.put("notes", `/notes/${this.note.noteId}`, {
      body: this.note.content
    });
  }

  handleCancel = async event => {
    event.preventDefault();
    try {
      this.props.history.push("/");
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
        <div className="Notes">
          <div>
            <p>{dateformat(this.note.content.createdTime, "ddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
            <p>{this.note.content.name} said:</p>
            <h3>{this.note.content.complaint}</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="comments">
              <ControlLabel>OK, I will help you</ControlLabel>
              <FormControl onChange={this.handleChange} value={this.state.comments} componentClass="input"/>
            </FormGroup>
            <FormGroup controlId="helperName">
              <ControlLabel>My name</ControlLabel>
              <FormControl onChange={this.handleChange} value={this.state.helperName} componentClass="input"/>
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="OK"
              loadingText="Committing..."
            />
            <LoaderButton
              block
              bsStyle="warning"
              bsSize="large"
              isLoading={this.state.isLoading}
              onClick={this.handleCancel}
              text="Cancel"
              loadingText="Cancelling…"
            />
          </form>
      </div>
    );
  }
}
