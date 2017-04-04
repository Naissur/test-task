import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes } from 'recompose';

const ConversationScriptStart = compose(
  setPropTypes({
  }),
  pure
)(({ onStart }) => {
  return (
    <div>
      <button onClick={onStart}>
        Начать разговор
      </button>
    </div>
  );
});

export default ConversationScriptStart;
