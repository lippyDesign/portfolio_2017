import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

import ContactForm from './ContactForm';
import SocialIcons from './SocialIcons';

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
    return <div className="contactPage">
      <p className='textCenter'>I'm glad you stopped by. Please feel free to reach out to me with any questions you might have.</p>
      <div className="contactInnerWrapper">
        <section className="socialWrapper">
          <div>
            <Subheader className='subHeader'>Social Contacts</Subheader>
            <SocialIcons icons={ICONS} />
          </div>
        </section>
        <section className="contactWrapper">
          <ContactForm { ...this.state } textChanged={this.textChanged} onFormSubmit={this.onFormSubmit} />
        </section>
        <section className="phoneAndLocationWrapper">
          <Subheader className='subHeader'>Other Contact Info</Subheader>
          <p><i className="fa fa-user" aria-hidden="true"></i> Vladimir Lipunov</p>
          <p><i className="fa fa-envelope" aria-hidden="true"></i> vololipu@gmail.com</p>
          <p><a href="tel:408-603-0004"><i className="fa fa-phone" aria-hidden="true"></i> 408-603-0004</a></p>
          <p><i className="fa fa-map-marker" aria-hidden="true"></i> Santa Clara, CA</p>
        </section>
      </div>
    </div>;
  }
}

const ICONS = [
  { path: 'https://github.com/lippyDesign', iconClass: "fa fa-github fa-3x", color: '#24292E' },
  { path: 'https://www.linkedin.com/in/vladimirlipunov/', iconClass: "fa fa-linkedin fa-3x",  color: '#0084BF' }
];