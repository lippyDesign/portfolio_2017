import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

import ContactForm from './ContactForm';
import SocialIcons from '../SocialIcons';
import { icons } from '../../items';

import validateEmail from '../../utils/validateEmail';

// set color to the icons.
// as Social Icons takes an optional color prop to apply to a particular icon
// had to copy the objects not to reference the originals when adding colors
var cloneOfGitHub = JSON.parse(JSON.stringify(icons[0]));
var cloneOfLinkedIn = JSON.parse(JSON.stringify(icons[1]));
cloneOfGitHub.color = '#24292E';
cloneOfLinkedIn.color = '#0084BF';
const iconsCopy = [cloneOfGitHub, cloneOfLinkedIn];

export default class extends React.Component {

  state = {
    email: '',
    name: '',
    message: '',
    emailErrorMessage: '',
    nameErrorMessage: '',
    messageErrorMessage: '',
    sendingInProgress: false,
    helperMessageOpen: false,
    helperMessageText: ''
  }

  // takes in the text vale and the field to update
  textChanged = (value, field) => {
    switch (field) {
      case 'email': return this.setState({ email: value, emailErrorMessage: '' });
      case 'name': return this.setState({ name : value, nameErrorMessage: '' });
      case 'message': return this.setState({ message : value, messageErrorMessage: '' });
      default: return;
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    const isValidated = this.runInputValidation();
    // if all inputs passed validation
    if (isValidated) {
      // set the sendingInProgress to true so the form could display spinner
      this.setState({ sendingInProgress: true });
      const { email, name, message } = this.state;
      // prepare the email to be sent
      const emailToBeSent = { from_email: email, from_name: name, message }
      // send email
      axios({
        method: 'post',
        url: 'https://us-central1-portfolio-d0138.cloudfunctions.net/send_contact_email',
        data: emailToBeSent
      })
        .then(() => { // if all goes well
          // refresh the input fields to be empty and set the , sendingInProgress to be false
          this.setState({
            email: '',
            name: '',
            message: '',
            emailErrorMessage: '',
            nameErrorMessage: '',
            messageErrorMessage: '',
            sendingInProgress: false,
            helperMessageText: 'Email Sent :)',
            helperMessageOpen: true
          });
        })
        .catch(e => {
          // set sendingInProgress to be false
          this.setState({ sendingInProgress: false, helperMessageText: 'There was an error :(' })
          console.log(e)
        })
    }
  }

  // trims email, name and message and checks if values are not empty
  // if values are empty set appropriate error messages
  runInputValidation() {
    const { email, name, message } = this.state;
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) this.setState({ emailErrorMessage: 'Valid email is required'});
    if (!name.trim()) this.setState({ nameErrorMessage: 'Name is required'});
    if (!message.trim()) this.setState({ messageErrorMessage: 'Message is required'});
    
    // returns BOOL, true if passes validation, false if fails validation
    return ([name, message].every(i => i.trim()) && isEmailValid);
  }

  // closes the helper message
  handleRequestClose = () => {
    this.setState({ helperMessageOpen: false });
  };

  render() {
    return <div className="contactPage">
       <Paper className="contactPageHeader">
        <h3 className='textCenter'>I'm glad you stopped by. Please feel free to reach out to me with any questions you might have.</h3>
      </Paper>
      <div className="contactInnerWrapper">
        <Paper className="socialWrapper">
          <div className="paperInnerWrapper">
            <h4>Social Contacts</h4>
            <SocialIcons icons={iconsCopy} />
          </div>
        </Paper>
        <Paper className="contactWrapper">
          <div className="paperInnerWrapper">
            <ContactForm { ...this.state } textChanged={this.textChanged} onFormSubmit={this.onFormSubmit.bind(this)} />
          </div>
        </Paper>
        <Paper className="otherInfoWrapper">
          <div className="paperInnerWrapper">
            <h4>Other Contact Info</h4>
            <p><i className="fa fa-user" aria-hidden="true"></i> Vladimir Lipunov</p>
            <p><i className="fa fa-envelope" aria-hidden="true"></i> vololipu@gmail.com</p>
            <p><a href="tel:408-603-0004"><i className="fa fa-phone" aria-hidden="true"></i> 408-603-0004</a></p>
            <p><i className="fa fa-map-marker" aria-hidden="true"></i> Santa Clara, CA</p>
          </div>
        </Paper>
      </div>
      <Snackbar
        open={this.state.helperMessageOpen}
        message={this.state.helperMessageText}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
        className='helperMessageWrapperStyle'
      /> 
    </div>;
  }
}