import React, { Component } from 'react';
import Routes from './Components/Routes'
import TopNavigation from './Components/sideNavigation';
import SideNavigation from './Components/sideNavigation';
import './App.css';
export default class App extends Component {
 
  render() {
    return (
      
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          <main id="content" className="p-5">
            <Routes />
          </main>
        </div>
    );
  }
}
