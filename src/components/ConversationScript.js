import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes, withState, withHandlers } from 'recompose';

import ConversationScriptStart from './ConversationScriptStart';
import ScriptStep from './ScriptStep';

const ConversationScript = compose(
  setPropTypes({
  }),
  withState('started', 'setStarted', false),
  withState('step', 'setStep', '0'), // TODO GENERALIZE
  withState('stepsHistory', 'setStepsHistory', []),
  withHandlers({
    replyClicked: ({ setStep, stepsHistory, setStepsHistory }) => (oldId, newId) => {
      console.log('replyClicked', newId);
      setStep(newId);
      setStepsHistory([...stepsHistory, oldId]);
    }
  }),
  pure
)(({
  stopped, onStart, started, setStarted, scriptData, setStep, step,
  replyClicked,
  stepsHistory,
  setStepsHistory
}) => {

  if (started) {
    return (
      <div>
        {stepsHistory.map(
          stepId => (<div>Мы: {scriptData[stepId].line}</div>)
        )}
        <ScriptStep
          scriptData={scriptData}
          onReplyClicked={(newId, oldId) => replyClicked(newId, oldId)}
          stepId={step}
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
