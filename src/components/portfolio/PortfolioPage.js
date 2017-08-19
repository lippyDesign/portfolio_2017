import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Projects from './Projects';
import { projects } from '../../items';

export default class extends React.Component {
  state = { value: 'allApps', menuValues: [] };

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

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return <div>
      <Paper className="portfolioPageHeader">
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value='allApps' primaryText="All Apps" />
          {this.renderMenuItems()}
        </DropDownMenu>
        <h3 className='textCenter'>
          <span>Showcase Of </span>My Latest Works
        </h3>  
      </Paper>
      <Projects projects={projects} />
    </div>;
  }
}