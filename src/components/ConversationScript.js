import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes, withState, withHandlers } from 'recompose';

import { last, dropLast, head } from 'ramda';

import ConversationScriptStart from './ConversationScriptStart';
import ScriptStep from './ScriptStep';
import Timer from './Timer';

const ConversationScript = compose(
  setPropTypes({
    started: PropTypes.any.isRequired,
    timeStarted: PropTypes.any.isRequired,
    stepsHistory: PropTypes.any.isRequired,
    setStepsHistory: PropTypes.any.isRequired
  }),
  withHandlers({
    setStarted: ({ setStarted, setTimeStarted }) => val => {
      setStarted(val);
      setTimeStarted((new Date()).getTime());
    },
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
      setStepsHistory(dropLast(1, stepsHistory));
    },
    stepToBeginning: ({ setStep, stepsHistory, setStepsHistory, scriptData }) => () => {
      if (stepsHistory.length === 0) {
        return; //do nothing
      }

      const initStep = head(stepsHistory).stepId;

      setStep(initStep);
      setStepsHistory([]);
    }
  }),
  pure
)(({
  stopped, onStart, started, setStarted, scriptData, setStep, step,
  replyClicked,
  stepBack,
  stepToBeginning,
  stepsHistory,
  setStepsHistory,
  timeStarted,
}) => {

  if (started) {
    return (
      <div>
        <Timer since={timeStarted} />
        <br />

        {stepsHistory.map(
          ({ stepId, replyId }) => (
            <div key={stepId}>
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
        {(stepsHistory.length >= 1) && (
          <button onClick={stepToBeginning}>В начало</button>
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
