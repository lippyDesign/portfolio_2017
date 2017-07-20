import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import { withRouter } from 'react-router-dom';

class Navi extends React.Component {

  state = { open: false, screenWidth: 0, activeNaviItem: '' };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    // set active navi item on page reload or first load
    this.setActiveNaviItem();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  }

  updateTitleStyle() {
    if (this.state.screenWidth <= 430 && this.state.screenWidth > 375) {
      return { fontSize: 22}
    } else if (this.state.screenWidth <= 375 && this.state.screenWidth > 330) {
      return { fontSize: 18}
    } else if (this.state.screenWidth <= 330) {
      return { fontSize: 16}
    }
  }

  handleDrawerToggle = () => this.setState({ open: !this.state.open });

  handleNavButtonPress(path) {
    this.setActiveNaviItem(path);
    this.props.history.push(path);
  }

  setActiveNaviItem(path) {
    path = path || this.props.history.location.pathname;
    let activeNaviItem = ''
    if (path !== '/') {
      path = path.replace('/', '');
      activeNaviItem = '| ' + path.charAt(0).toUpperCase() + path.slice(1);
    }
    this.setState({ activeNaviItem, open: false })
  }

  // different top navigations bars are rendered depending on screen size
  renderTopMenuBar() {
    if (this.state.screenWidth < 875) { // navbar for small screens
      return <AppBar
        title={`Vladimir Lipunov ${this.state.activeNaviItem}`}
        titleStyle={this.updateTitleStyle()}
        onTitleTouchTap={() => this.handleNavButtonPress('/')}
        showMenuIconButton={false}
        iconElementRight={<IconButton><MenuIcon /></IconButton>}
        onRightIconButtonTouchTap={this.handleDrawerToggle}
      />
    }
    // navbar for large screens
    return <AppBar
      title={`Vladimir Lipunov ${this.state.activeNaviItem}`}
      showMenuIconButton={false}
      titleStyle={this.updateTitleStyle()}
      onTitleTouchTap={() => this.handleNavButtonPress('/')}
    >
      <div className='topMenuBottomWrapper'>
        {this.renderTopMenuBarItems()}
      </div>
    </AppBar>
  }

  // sidebar only gets rendered if the screen width < 875
  renderSideBar() {
    if (this.state.screenWidth < 875) {
      return (
        <Drawer
          openSecondary
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          {this.renderSidebarItems()}
        </Drawer>
      );
    }
  }

  renderBottomMenuBar() {
    // Filter to only have bottom menu items
    // And set up the index of the bottom menu order as BottomNavigation requires an index to highlight active item
    // we are only rendering the bottom menu on small screens
    if (this.state.screenWidth < 875) {
      const bottomMenuItems = [];
      const indexTable = {}
      let i = 0
      this.props.menuItems.forEach(item => {
        if (item.appearInBottomMenuBar) {
          bottomMenuItems.push(item);
          // Home shows up as empty string as there is no route, so we'll set it up as such
          if (item.name === 'Home') indexTable[''] = i;
          else indexTable[item.name] = i;
          i++;
        }
      });
      let activeIndex = indexTable[this.state.activeNaviItem.replace('| ', '')]

      return <Paper zDepth={1} style={{position: 'fixed', bottom: 8, left: 8, right: 8}}>
        <BottomNavigation selectedIndex={activeIndex}>
          {this.renderBottomMenuBarItems(bottomMenuItems)}
        </BottomNavigation>
      </Paper>;
    }
  }

  renderSidebarItems() {
    const sideBarItems = this.props.menuItems.filter(item => item.appearInSideBar);
    return sideBarItems.map(item => {
      // set color on active menu item
      let menuButtonColor = item.name === this.state.activeNaviItem.replace('| ', '') ? 'rgb(0, 188, 212)' : '#000';
      if (item.name === 'Home' && this.state.activeNaviItem === '') menuButtonColor = 'rgb(0, 188, 212)';
      return <MenuItem key={item.path} innerDivStyle={{textAlign: 'center', paddingLeft: 70, display:'flex', alignItems:'center', color: menuButtonColor }} onTouchTap={() => this.handleNavButtonPress(item.path)}>
        <i className="material-icons sideBarIcon">{item.icon}</i> {item.name}
      </MenuItem>;
    });
  }

  renderTopMenuBarItems() {
    // filter to only have top menu items
    const topMenuBarItems = this.props.menuItems.filter(item => item.appearInTopMenuBar);
    return topMenuBarItems.map(item => {
      // make icon
      const icon = <FontIcon className="material-icons">{item.icon}</FontIcon>
      // set color on active menu item
      let menuButtonColor = item.name === this.state.activeNaviItem.replace('| ', '') ? {color:'rgb(0, 188, 212)', backgroundColor: '#FFFFFF'} : {color:'#FFFFFF', backgroundColor: 'rgb(0, 188, 212)'};
      if (item.name === 'Home' && this.state.activeNaviItem === '') menuButtonColor = {color:'rgb(0, 188, 212)', backgroundColor: '#FFFFFF'};
      return <FlatButton icon={icon} key={item.path} style={menuButtonColor} label={item.name} onTouchTap={() => this.handleNavButtonPress(item.path)} />
    });
  }

  renderBottomMenuBarItems(bottomMenuItems) {
    return bottomMenuItems.map(item => {
      // make icon
      const icon = <FontIcon className="material-icons">{item.icon}</FontIcon>
      return <BottomNavigationItem key={item.name} label={item.name} icon={icon} onTouchTap={() => this.handleNavButtonPress(item.path)} />;
    });
  }

  render() {
    return (
      <div>
        {this.renderTopMenuBar()}
        {this.renderSideBar()}
        {this.renderBottomMenuBar()}
      </div>
    );
  }
}

export default withRouter(Navi);