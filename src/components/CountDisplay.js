import React, { Component } from 'react';

import '../styles/CountDisplay.css';

class CountDisplay extends Component {
  render() {
    return(
      <div className="count-display">
        <h3 className="count-title">{this.props.title}</h3>
        <h4 className="month-name">{this.props.monthName}</h4>
        <div className="circle-container">
          <div className="count-details">
            <p className="count-data">{this.props.count} / {this.props.daysInSelectedMonth}</p> days
          </div>
        </div>
      </div>
    );
  }
}

export default CountDisplay;
