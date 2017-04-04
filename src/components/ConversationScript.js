import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes, withState, withHandlers } from 'recompose';

import { last, dropLast } from 'ramda';

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
      const newStep = scriptData[stepId].replies[replyId].to;

      setStep(newStep);
      setStepsHistory([...stepsHistory, { stepId, replyId }]);
    },
    stepBack: ({ setStep, stepsHistory, setStepsHistory, scriptData }) => () => {
      if (stepsHistory.length === 0) {
        return; //do nothing
      }

      const prevStep = last(stepsHistory).stepId;

      setStep(prevStep);
      setStepsHistory(dropLast(stepsHistory));
    }
  }),
  pure
)(({
  stopped, onStart, started, setStarted, scriptData, setStep, step,
  replyClicked,
  stepBack,
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
        {(stepsHistory.length >= 1) && (
          <button onClick={stepBack}>Назад</button>
        )}
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
