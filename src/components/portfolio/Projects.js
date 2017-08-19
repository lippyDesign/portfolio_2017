import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

export default class extends React.Component {
  renderProjects() {
    return this.props.projects.map(({ title, img, description, url, id, technology, featured }) => {
      console.log(id)
      return <GridTile
        key={id}
        title={title}
        actionIcon={<IconButton><FontIcon className="fa fa-ellipsis-v textWhite"></FontIcon></IconButton>}
        actionPosition="right"
        titlePosition="bottom"
        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        cols={featured ? 2 : 1}
        rows={featured ? 2 : 1}
      >
        <img src={img} onClick={() => window.open(url)} className='projectImage' />
      </GridTile>
    });
  }
  render() {
    return <div className='projectsContainer'>
      <Card>
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src={this.props.projects[0].img} alt="" />
        </CardMedia>
         {/* <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>  */}
      </Card>
    </div>
  }
}