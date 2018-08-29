import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoaderButton from "../components/LoaderButton";
import { API } from "../libs/amplify";
import "./AskForHelp.css";
import dateformat from "dateformat";

export default class AskForHelp extends Component {
  constructor(props) {
    super(props);

    this.note = props.location.state || { content: {} };

    this.state = {
      name: this.note.content.name || "",
      sex: this.note.content.sex,
      dob: this.note.content.dob || "",
      complaint: this.note.content.complaint || ""
    };
  }

  validateForm() {
    return this.state.name && this.state.name.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleDateChange = value => {
    this.setState({
      dob: dateformat(value, "isoDate")
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      this.note.content.name = this.state.name;
      this.note.content.sex = this.state.sex;
      this.note.content.dob = this.state.dob;
      this.note.content.complaint = this.state.complaint;
      this.note.content.createdTime = Date.now();

      await this.commitDemand();

      this.props.history.push("/", this.note);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  commitDemand() {
    if (this.note.nodeId) {
      API.put("notes", `/notes/${this.note.noteId}`, {
        body: this.note.content
      });
    } else {
      API.post("notes", `/notes`, {
        body: this.note.content
      }).then(response => (this.note = response));
    }
  }

  handleCancel = async event => {
    event.preventDefault();
    if (this.state.isDeleting) {
      return;
    }

    if (this.note.noteId) {
      const confirmed = window.confirm(
        "Are you sure you want to cancel the request?"
      );
      if (!confirmed) {
        return;
      }
      this.setState({ isDeleting: true });
      try {
        if (this.note.noteId) {
          await API.del("notes", `/notes/${this.note.noteId}`);
        }
      } catch (e) {
        alert(e);
      }
      this.setState({ isDeleting: false });
    }
    this.props.history.push("/");
  };

  render() {
    const me = this;
    return (
      <div className="NewNote">
        <form onSubmit={me.handleSubmit}>
          <FormGroup controlId="name">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              onChange={me.handleChange}
              value={me.state.name}
              componentClass="input"
            />
          </FormGroup>
          <FormGroup controlId="dob">
            <ControlLabel>Date of Birth</ControlLabel>
            <FormControl
              onChange={me.handleChange}
              value={me.state.dob}
              componentClass="input"
            />
          </FormGroup>
          <FormGroup controlId="complaint">
            <ControlLabel>What help do you need? </ControlLabel>
            <FormControl
              onChange={me.handleChange}
              value={me.state.complaint}
              componentClass="input"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Commit"
            loadingText="Committing…"
          />
          <LoaderButton
            block
            bsStyle="warning"
            bsSize="large"
            isLoading={this.state.isLoading}
            onClick={this.handleCancel}
            text="Cancel"
            loadingText="Deleting…"
          />
        </form>
      </div>
    );
  }
}
