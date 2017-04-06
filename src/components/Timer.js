import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes, lifecycle, withState } from 'recompose';

const Timer = compose(
  setPropTypes({
    since: PropTypes.number.isRequired
  }),
  withState('lastUpdated', 'setLastUpdated', (new Date())),
  withState('interval', 'setInterval', 0),
  lifecycle({
    componentDidMount() {
      this.props.setLastUpdated((new Date()).getTime());

      this.props.setInterval(setInterval(() => {
        this.props.setLastUpdated((new Date()).getTime());
      }, 1000));
    },
    componentWillUnmount() {
      clearInterval(this.props.interval);
    }
  }),
  pure
)(({ since, lastUpdated }) => {
  const secondsPassed = Math.ceil((lastUpdated - since) / 1000);

  return (
    <div>
      Прошло: {secondsPassed} сек.
    </div>
  );
});

export default Timer;
