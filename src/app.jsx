import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../styles/index.scss';

import Navi from './components/Navi';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import PortfolioPage from './components/PortfolioPage';
import ContactPage from './components/ContactPage';

const MENU_ITEMS = [
  { name: 'Home', path: '/', appearInSideBar: true, appearInTopMenuBar: true, appearInBottomMenuBar: true, icon: 'home' },
  { name: 'About', path: 'about', appearInSideBar: true, appearInTopMenuBar: true, appearInBottomMenuBar: true, icon: 'person' },
  { name: 'Portfolio', path: 'portfolio', appearInSideBar: true, appearInTopMenuBar: true,appearInBottomMenuBar: true, icon:'work'},{ name: 'Contact', path: 'contact', appearInSideBar: true, appearInTopMenuBar: true, appearInBottomMenuBar: true, icon: 'email' }
];

class App extends React.Component {
  render() {
    return <Router>
      <MuiThemeProvider>
      <div className="App">
        <Navi menuItems={MENU_ITEMS} />
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/contact" component={ContactPage} />
      </div>
      </MuiThemeProvider>
    </Router>
  }
}

export default App;
