import React from 'react';
import Paper from 'material-ui/Paper';
import SocialIcons from './SocialIcons';

export default class extends React.Component {
  render() {
    return <Paper zDepth={1} className="footer">
      <p className="textCenter">Vladimir Lipunov Portfolio  2017</p>
      <p className="textCenter footerSmallText">Design & Build Beautiful Web Experiences</p>
      <div className="footerIcons textCenter">
        <SocialIcons icons={ICONS} />
      </div>
    </Paper>;
  }
}

const ICONS = [
  { path: 'https://github.com/lippyDesign', iconClass: "fa fa-github fa-3x", color: '#FFF' },
  { path: 'https://www.linkedin.com/in/vladimirlipunov/', iconClass: "fa fa-linkedin fa-3x", color: '#FFF' }
];