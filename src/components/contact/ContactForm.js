import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class extends React.Component {
  renderButtonOrSpinner() {
    // display activity indicator instead of button while sending of email is in progres
    if (this.props.sendingInProgress) {
      return <div className='spinnerWrapper'>
        <CircularProgress />
      </div>;
    }
    return <RaisedButton
      primary
      fullWidth
      label="Send Message"
      icon={<i style={styles.iconStyle} className="fa fa-paper-plane" aria-hidden="true"></i>}
      style={styles.buttonStyle}
      onClick={this.props.onFormSubmit}
    />;
  }
  render() {
    return <form style={styles.formStyle} onSubmit={this.props.onFormSubmit}>
      <h4 className='textCenter'>Send an Email</h4>
      <TextField
        hintText="your@email.com"
        floatingLabelText="Email"
        errorText={this.props.emailErrorMessage}
        style={styles.inputStyle}
        value={this.props.email}
        onChange={event => this.props.textChanged(event.target.value, 'email')}
      />
      <TextField
        hintText="Your Name"
        floatingLabelText="Name"
        errorText={this.props.nameErrorMessage}
        style={styles.inputStyle}
        value={this.props.name}
        onChange={event => this.props.textChanged(event.target.value, 'name')}
      />
      <TextField
        hintText="Message Text"
        errorText={this.props.messageErrorMessage}
        floatingLabelText="Message"
        multiLine={true}
        rows={5}
        style={styles.inputStyle}
        value={this.props.message}
        onChange={event => this.props.textChanged(event.target.value, 'message')}
      />
      {this.renderButtonOrSpinner()}
    </form>;
  }
}

const styles = {
  formStyle: { padding: 5 },
  inputStyle: { display: 'block' },
  buttonStyle: { marginTop: 10 },
  iconStyle: { color: '#FFF' }
}