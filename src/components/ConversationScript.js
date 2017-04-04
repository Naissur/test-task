import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes, withState } from 'recompose';

import ConversationScriptStart from './ConversationScriptStart';
import ScriptStep from './ScriptStep';

const ConversationScript = compose(
  setPropTypes({
  }),
  withState('started', 'setStarted', false),
  pure
)(({ stopped, onStart, started, setStarted, scriptData }) => {

  if (started) {
    return (
      <div>
        <ScriptStep
          scriptData={scriptData}
          stepId="0"
        />
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
