import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes, withState } from 'recompose';

import ConversationScriptStart from './ConversationScriptStart';

const ConversationScript = compose(
  setPropTypes({
  }),
  withState('started', 'setStarted', false),
  pure
)(({ stopped, onStart, started, setStarted }) => {

  if (started) {
    return (
      <div>
        Started!
      </div>
    );
  }

  return (
    <div>
      <ConversationScriptStart
        onStart={() => setStarted(true)}
      />
    </div>
  );
});

export default ConversationScript;
