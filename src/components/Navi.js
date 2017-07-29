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

  state = { open: false, screenWidth: 0, activeNaviItem: '', isBottomNavActive: false };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('scroll', this.handleScroll);
    // set active navi item on page reload or first load
    this.setActiveNaviItem();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.handleScroll);
  }

  // will get screen dimensions
  updateWindowDimensions = () => this.setState({ screenWidth: window.innerWidth });

  // will set nav to be inactive anytime user scrolls
  handleScroll = () => this.setState({ isBottomNavActive: false });

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
    var firstThreeChars = path.substring(0, 3);
    // if first 3 characters of the path are htt or wwww,
    // than we know tha the path is to another website, so we'll open it in a new window
    if (firstThreeChars === 'htt' || firstThreeChars === 'wwww') {
      window.open(path)
    } else {
      // else we know the path is to this website, so we'll use react router to navigate
      this.setActiveNaviItem(path);
      this.props.history.push(path);
    }
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
        zDepth={1}
        title={`Vladimir Lipunov ${this.state.activeNaviItem}`}
        titleStyle={this.updateTitleStyle()}
        onTitleTouchTap={() => this.handleNavButtonPress('/')}
        showMenuIconButton={false}
        iconElementRight={<IconButton><MenuIcon /></IconButton>}
        onRightIconButtonTouchTap={this.handleDrawerToggle}
        style={{backgroundColor: '#333'}}
      />
    }
    // navbar for large screens
    return <AppBar
      zDepth={1}
      title={`Vladimir Lipunov ${this.state.activeNaviItem}`}
      showMenuIconButton={false}
      titleStyle={this.updateTitleStyle()}
      onTitleTouchTap={() => this.handleNavButtonPress('/')}
      style={{backgroundColor: '#333'}}
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
          disableSwipeToOpen
          openSecondary
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <div className="sidebarWrapper">
            {this.renderSidebarItems()}
          </div>
        </Drawer>
      );
    }
  }

  // only visible on small screens
  renderBottomMenuBar() {
    // we are only rendering the bottom menu on small screens
    // navbar may be active (full opacity) or not active (0.6 opacity)
    if (this.state.screenWidth < 875) {
      const menuStyle = this.state.isBottomNavActive ? { zIndex: 100, position: 'fixed', bottom: 8, left: 8, right: 8 } : {zIndex: 100, position: 'fixed', bottom: 8, left: 8, right: 8, opacity: 0.3 }
      return <Paper zDepth={1} style={menuStyle}>
        <BottomNavigation>
          <div id='bottomMenuBox' className='bottomMenuBox' onClick={() => this.setState({isBottomNavActive: !this.state.isBottomNavActive})}>
            {this.renderBottomMenuBarItems()}
          </div>
        </BottomNavigation>
      </Paper>;
    }
  }

  renderSidebarItems() {
    const sideBarItems = this.props.menuItems.filter(item => item.appearInSideBar);
    return sideBarItems.map(item => {
      // set color on active menu item
      let menuButtonColor = item.name === this.state.activeNaviItem.replace('| ', '') ? 'rgb(0, 188, 212)' : '#555';
      if (item.name === 'Home' && this.state.activeNaviItem === '') menuButtonColor = 'rgb(0, 188, 212)';
      return <MenuItem key={item.path} innerDivStyle={{textAlign: 'center', paddingLeft: 70, display:'flex', alignItems:'center', color: menuButtonColor }} onTouchTap={() => this.handleNavButtonPress(item.path)}>
        <i className={`${item.icon} sideBarIcon`}></i> {item.name}
      </MenuItem>;
    });
  }

  renderTopMenuBarItems() {
    // filter to only have top menu items
    const topMenuBarItems = this.props.menuItems.filter(item => item.appearInTopMenuBar);
    return topMenuBarItems.map(item => {
      // make icon
      const icon = this.makeIcon(item.icon)
      // set color on active menu item
      let menuButtonColor = item.name === this.state.activeNaviItem.replace('| ', '') ? {color:'#333', backgroundColor: '#FFFFFF'} : {color:'#FFFFFF', backgroundColor: '#333'};
      if (item.name === 'Home' && this.state.activeNaviItem === '') menuButtonColor = {color:'#333', backgroundColor: '#FFFFFF'};
      return <FlatButton icon={icon} key={item.path} style={menuButtonColor} label={item.name} onTouchTap={() => this.handleNavButtonPress(item.path)} />
    });
  }

  renderBottomMenuBarItems() {
    // filter to only have bottom menu items
    const bottomMenuItems = this.props.menuItems.filter(item => item.appearInBottomMenuBar);
    return bottomMenuItems.map(item => {
      // make icon
      const icon = this.makeIcon(item.icon)
      // set color on active menu item
      let bottomMenuButtonColor = item.name === this.state.activeNaviItem.replace('| ', '') ? 'bottomMenuButtonActive' : 'bottomMenuButtonNotActive';
      if (item.name === 'Home' && this.state.activeNaviItem === '') bottomMenuButtonColor = 'bottomMenuButtonActive';
      if(!this.state.isBottomNavActive) {
        // if bottom menu bar is not active, return with no onClick handler to prevent navigation if inactive navabar item is tapped
        return <BottomNavigationItem className={`bottomMenuItem ${bottomMenuButtonColor}`} key={item.name} label={item.name} icon={icon} />;
      }
      return <BottomNavigationItem className={`bottomMenuItem ${bottomMenuButtonColor}`} key={item.name} label={item.name} icon={icon} onTouchTap={() => this.handleNavButtonPress(item.path)} />;
    });
  }

  makeIcon(nameOfIconClass) {
    return <FontIcon className={nameOfIconClass}></FontIcon>
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