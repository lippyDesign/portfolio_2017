import React from 'react';
import Paper from 'material-ui/Paper';
import SocialIcons from './SocialIcons';
import { icons } from '../items';

export default class extends React.Component {
  render() {
    return <Paper zDepth={1} className="footer">
      <p className="textCenter">Vladimir Lipunov Portfolio  2017</p>
      <p className="textCenter footerSmallText">Design & Build Beautiful Web Experiences</p>
      <div className="footerIcons textCenter">
        <SocialIcons icons={icons} />
      </div>
    </Paper>;
  }
}