import React, { Component } from 'react';
import CountDisplay from './CountDisplay';
import Loading from './Loading';

import '../styles/Selector.css';

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hourlyData: [],
      daysInSelectedMonth: 31,
      monthNumber: '00',
      monthName: '',
      daysHeatingTurnedOn: 0,
      daysACTurnedOn: 0,
      isLoading: false,
      idleState: true
    }
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.calculateIfTurnedOnOnce = this.calculateIfTurnedOnOnce.bind(this);
  }

  handleMonthChange(monthNumber, daysInSelectedMonth, monthName) {
    this.setState({
      monthNumber,
      daysInSelectedMonth,
      monthName,
      idleState: false,
      daysHeatingTurnedOn: 0,
      daysACTurnedOn: 0,
      hourlyData: []
    });
    this.getData();
  }

  async getData() {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const darkSkyApi = 'https://api.darksky.net/forecast/'

    this.setState({ isLoading: true });
    for (let i = 1; i <= this.state.daysInSelectedMonth; i++) {
      // This is a simple one line fix to ensure that the day/date is always in double
      // digits i.e '07'
      i < 10 ? i = '0' + i : i

    await fetch(proxy + darkSkyApi + `${process.env.REACT_APP_DARK_SKY_KEY}/45.5898,-122.5951,2018-${this.state.monthNumber}-${i}T00:00:00`)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        // First get all hourly data
        this.setState({
          hourlyData: data.hourly.data
        });
        // Then iterate over that day and see if Heating or AC turned on at all.
        this.calculateIfTurnedOnOnce(this.state.hourlyData);
      }).catch(function(error) {
        console.log('request failed', error);
      });
    }
    this.setState({ isLoading: false });
  }

  calculateIfTurnedOnOnce(data) {
      let heatingTurnedOnCount = 0;
      let acTurnedOnCount = 0;

      for (let i = 0; i < data.length; i ++) {
        if (data[i].temperature < 62) {
          heatingTurnedOnCount = 1;
        }

        if (data[i].temperature > 75) {
          acTurnedOnCount = 1;
        }
      }
      // The two above variables will either be a 1 or 0 depending on if their
      // conditions were met, this will then be added to the previous total.
      this.setState( prevState => ({
        daysHeatingTurnedOn: prevState.daysHeatingTurnedOn + heatingTurnedOnCount,
        daysACTurnedOn: prevState.daysACTurnedOn + acTurnedOnCount
      }));
  }

  // The following two methods are simple helper methods to help tidy up
  // and modularize the async/await call from the API.
  checkStatus = response => {
    if (response.ok) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  parseJSON = res => res.json();

  render() {
    return(
      <div>
        <h3 className="select-month">Please select a month: </h3>
          <div className="month-container">
            <div className="month-button" onClick={() => this.handleMonthChange('01', 31, "January") }>January</div>
            <div className="month-button" onClick={() => this.handleMonthChange('02', 28, "February") }>February</div>
            <div className="month-button" onClick={() => this.handleMonthChange('02', 7, "March") }>March</div>
            <div className="month-button" onClick={() => this.handleMonthChange('04', 2, "April") }>April</div>
            <div className="month-button" onClick={() => this.handleMonthChange('05', 2, "May") }>May</div>
          </div>

          { !this.state.idleState ?
            <div className="count-containers">
              <div className="count-tile">
                <CountDisplay
                  title={"Days where the Heating system came on at least once: "}
                  count={this.state.daysHeatingTurnedOn}
                  daysInSelectedMonth={this.state.daysInSelectedMonth}
                  monthName={this.state.monthName}
                />
              </div>

              <div className="count-tile">
                <CountDisplay
                  title={"Days where the Air Conditioning system came on at least once: "}
                  count={this.state.daysACTurnedOn}
                  daysInSelectedMonth={this.state.daysInSelectedMonth}
                  monthName={this.state.monthName}
                />
              </div>
            </div>
            :
            <div>
            </div>
          }

          <div className="loading-spinner">
            { this.state.isLoading ? <Loading /> : <div></div>}
          </div>
      </div>
    );
  }
}

export default Selector;
