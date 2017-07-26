import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import ContactForm from './ContactForm';

export default class extends React.Component {

  state = { email: '', name: '', message: '', emailErrorMessage: '', nameErrorMessage: '', messageErrorMessage: '' }

  // takes in the text vale and the field to update
  textChanged = (value, field) => {
    switch (field) {
      case 'email': return this.setState({ email: value, emailErrorMessage: '' });
      case 'name': return this.setState({ name : value, nameErrorMessage: '' });
      case 'message': return this.setState({ message : value, messageErrorMessage: '' });
      default: return;
    }
  }

  onFormSubmit = event => {
    event.preventDefault();
    const isValidated = this.runInputValidation();
    // 
    if (isValidated) {
      // if all inputs passed validation
      console.log('allvalidated')
    }
  }

  // trims email, name and message and checks if values are not empty
  // if values are empty set appropriate error messages
  runInputValidation() {
    const { email, name, message } = this.state;
    if (!email.trim()) this.setState({ emailErrorMessage: 'Email is required'});
    if (!name.trim()) this.setState({ nameErrorMessage: 'Name is required'});
    if (!message.trim()) this.setState({ messageErrorMessage: 'Message is required'});
    // returns BOOL, true if passes validation, false if fails validation
    return [email, name, message].every(i => i.trim());
  }

  render() {
    return <Paper zDepth={1} style={{marginTop: 8}}>
      <section className="contactWrapper">
        <ContactForm { ...this.state } textChanged={this.textChanged} onFormSubmit={this.onFormSubmit} />
      </section>
    </Paper>;
  }
}