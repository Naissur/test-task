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
    replyClicked: ({ setStep, stepsHistory, setStepsHistory, scriptData }) => (stepId, replyId) => {
      console.log('replyClicked', { stepId, replyId });
      const newStep = scriptData[stepId].replies[replyId].to;

      console.log('replyClicked', { newStep });

      setStep(newStep);
      setStepsHistory([...stepsHistory, { stepId, replyId }]);
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
          ({ stepId, replyId }) => (
            <div>
              Мы: {scriptData[stepId].line}
              <br />
              Клиент: {scriptData[stepId].replies[replyId].line}
            </div>
          )
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
