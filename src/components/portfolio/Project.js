import React from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

export default class extends React.Component {
  state = { isOverlayOpen: false };

  toggleOverlay = () => {
    this.setState({ isOverlayOpen: !this.state.isOverlayOpen });
  }

  renderOverlay(title, technology, description) {
    // build a string from technology array
    let techString = '';
    technology.forEach((tech, index) => {
      if (index === 0) techString += tech;
      else techString += `, ${tech}`;
    });
    return <CardTitle
      className='cardOverlay'
      title={title}
      subtitle={this.state.isOverlayOpen ? <div><p>{techString}</p><p>{description}</p></div> : ''}
    />
  }

  render() {
    const { title, img, description, url, id, technology, featured } = this.props.project;
    return <Card key={id} className='projectCard'>
      <CardMedia
        overlay={this.renderOverlay(title, technology, description)}
      >
        <img className='projectImage' src={img} alt={title} />
      </CardMedia>
        <CardActions className='cardActionsWrapper'>
        <FlatButton
          onClick={() => window.open(url)}
          label="View"
          icon={<i className="fa fa-external-link" aria-hidden="true" />}
        />
        <FlatButton
          onClick={this.toggleOverlay}
          label={this.state.isOverlayOpen ? "Less" : "More"}
          icon={<i className="fa fa-ellipsis-v" aria-hidden="true" />}
        />
      </CardActions> 
    </Card>
  }
}