import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Project from './Project';
import { projects } from '../../items';

export default class extends React.Component {
  state = { menuValue: 'allApps', menuValues: [] };

  componentDidMount() {
    this.createMenuItemValues();
  }

  // pull technologies off of projects, then reduce technologies
  createMenuItemValues() {
    const menuItemValues = [];
    projects.forEach(({ technology }) => {
      technology.forEach(technologyItem => {
        if (menuItemValues.indexOf(technologyItem) === -1) {
          menuItemValues.push(technologyItem);
        }
      });
    });
    this.setState({ menuValues: [...menuItemValues]});
  }

  renderMenuItems() {
    return this.state.menuValues.map(menuValue => <MenuItem key={menuValue} value={menuValue} primaryText={menuValue} />);
  }

  // change menu items in technology selection
  handleMenuItemChange = (event, index, value) => this.setState({ menuValue: value });

  // render the list of projects
  // filter based on the value in the menu
  renderProjects = () => {
    if (this.state.menuValue === 'allApps') {
      return projects.map(project => <Project key={project.id} project={project} />)
    }
    const filteredProjects = projects.filter(project => (project.technology.indexOf(this.state.menuValue) !== -1))
    return filteredProjects.map(project => <Project key={project.id} project={project} />)
  }

  render() {
    return <div className='portfolioPage'>
      <Paper className="portfolioPageHeader">
        <i className="fa fa-eye" />
        <DropDownMenu value={this.state.menuValue} labelStyle={{ color: '#0084BF'}} onChange={this.handleMenuItemChange}>
          <MenuItem value='allApps' primaryText="All Apps" />
          {this.renderMenuItems()}
        </DropDownMenu>
        <h3 className='textCenter'>
          <span>Showcase Of </span>My Latest Works
        </h3>  
      </Paper>
      <Paper className='projectsOuterContainer'>
        <div className='projectsInnerContainer'>
          {this.renderProjects()}
        </div>
      </Paper>
    </div>;
  }
}