import React from 'react';
import Subheader from 'material-ui/Subheader';

export default class extends React.Component {
  renderIcons() {
    return this.props.icons.map(({ path, iconClass, color }) => {
      return <a style={{ color, padding: 5 }} key={iconClass} href={path} target='_blank'>
        <i className={iconClass} aria-hidden="true"></i>
      </a>;
    });
  }
  render() {
    return <div>{this.renderIcons()}</div>;
  }
}