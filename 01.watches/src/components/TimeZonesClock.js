import { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class TimeZonesClock extends Component {
  state = { clock: moment().utcOffset(this.props.zone) };

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.setState({ clock: moment().utcOffset(this.props.zone) });
    }, 500);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  calcDegree = (momentTime) => {
    const second = momentTime.second() * 6;
    const minute = momentTime.minute() * 6;
    const hour = momentTime.hour() * 30;
    return { second, minute, hour };
  };

  render() {
    const { second, minute, hour } = this.calcDegree(this.state.clock);
    return (
      <div className="timezones__watch">
        {this.props.title} (UTC {this.props.zone})
        <div className="timezones__watch__clock">
          <div className="timezones__watch__face">
            <div
              className="timezones__watch__hour"
              style={{ transform: `rotate(${hour}deg)` }}
            >
              <div className="timezones__watch__hand" />
            </div>
          </div>
          <div className="timezones__watch__face">
            <div
              className="timezones__watch__minute"
              style={{ transform: `rotate(${minute}deg)` }}
            >
              <div className="timezones__watch__hand" />
            </div>
          </div>
          <div className="timezones__watch__face">
            <div
              className="timezones__watch__second"
              style={{ transform: `rotate(${second}deg)` }}
            >
              <div className="timezones__watch__hand" />
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

TimeZonesClock.propTypes = {
  title: PropTypes.string.isRequired,
  zone: PropTypes.number.isRequired,
};
