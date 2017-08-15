import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import '../styles/index.scss';

import Navi from './components/Navi';
import HomePage from './components/HomePage';
import AboutPage from './components/about/AboutPage';
import PortfolioPage from './components/PortfolioPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

const MENU_ITEMS = [
  { name: 'Home', path: '/', appearInSideBar: true, appearInTopMenuBar: true, appearInBottomMenuBar: true, icon: 'fa fa-home fa-2x' },
  { name: 'About', path: 'about', appearInSideBar: true, appearInTopMenuBar: true, appearInBottomMenuBar: true, icon: 'fa fa-info-circle fa-2x' },
  { name: 'Portfolio', path: 'portfolio', appearInSideBar: true, appearInTopMenuBar: true,appearInBottomMenuBar: true, icon:'fa fa-briefcase fa-2x'},
  { name: 'Contact', path: 'contact', appearInSideBar: true, appearInTopMenuBar: true, appearInBottomMenuBar: true, icon: 'fa fa-envelope fa-2x' },
  { name: 'GitHub', path: 'https://github.com/lippyDesign', appearInSideBar: true, appearInTopMenuBar: false, appearInBottomMenuBar: true, icon: 'fa fa-github fa-2x' },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/in/vladimirlipunov/', appearInSideBar: true, appearInTopMenuBar: false, appearInBottomMenuBar: true, icon: 'fa fa-linkedin fa-2x' }
];

class App extends React.Component {
  render() {
    return <Router>
      <MuiThemeProvider>
      <div className="App">
        <Navi menuItems={MENU_ITEMS} />
        <div className="content">
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/portfolio" component={PortfolioPage} />
          <Route path="/contact" component={ContactPage} />
        </div>
        <div className="footerWrapper">
          <Footer />
        </div>
      </div>
      </MuiThemeProvider>
    </Router>
  }
}

export default App;
