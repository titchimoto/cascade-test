import React, { Component } from 'react';
import Selector from './Selector';

import '../styles/Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="header">
          <img className="logo" src="http://cascadeenergy.com/wp-content/uploads/2018/04/cascade-energy-logo-2.png" alt="logo" />
          <h2 className="dashboard-heading">Port of Portland HVAC System Status</h2>
        </div>

        <div className="selector-container">
          <Selector />
        </div>
      </div>
    );
  }
}

export default Dashboard;
