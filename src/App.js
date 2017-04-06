import React, { Component } from 'react';
import { pure, withState, compose, withHandlers, lifecycle } from 'recompose';

import ConversationScript from './components/ConversationScript';
import ConversationScriptGraph from './components/ConversationScriptGraph';

const persistToLS = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
}
const retrieveFromLS = key => {
  let item;
  try {
    item = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    throw new Error('non-existent item');
  }

  if (item === null) {
    throw new Error('non-existent item');
  }

  return item;
}

const SCRIPT_DATA = {
  firstStep: 'A',
  'A': {
    line: 'Добрый день!',
    replies: {
      'RA': { id: 'RA', line: 'Привет', to: 'B'},
      'RB': { id: 'RB', line: 'Пока', to: 'C' }
    }
  },
  'B': {
    line: 'Чем я могу помочь?',
    replies: {
      'RA': { id: 'RA', line: 'Продукт отличный, я доволен. Очень доволен.', to: 'D' },
      'RB': { id: 'RB', line: 'Я хочу закончить ползьование. До свидания, было приятно иметь с вами дело.', to: 'C' },
    }
  },
  'C': {
    line: 'Всего доброго!',
    replies: {}
  },
  'D': {
    line: 'Мы очень рады вашему положительному отзыву. Спасибо за ваши ресурсы!',
    replies: {}
  }
};

export default compose(
  withState('started', 'setStarted', false),
  withState('timeStarted', 'setTimeStarted', 0),
  withState('step', 'setStep', SCRIPT_DATA.firstStep),
  withState('stepsHistory', 'setStepsHistory', []),
  lifecycle({
    componentDidMount() {
      try {
        const data = JSON.parse(localStorage.getItem('data'));

        const timeStarted = retrieveFromLS('lastTimeStarted');
        const step = retrieveFromLS('lastStep');
        const stepsHistory = retrieveFromLS('lastStepsHistory');

        console.log({ timeStarted, step, stepsHistory });

        const { setStarted, setTimeStarted, setStepsHistory, setStep } = this.props;

        setTimeStarted(timeStarted);
        setStep(step);
        setStepsHistory(stepsHistory);
        setStarted(true);
      } catch(e) {
      }
    }
  }),
  withHandlers({
    setStep: ({ setStep, timeStarted, step, stepsHistory }) => id => {
      setStep(id);
      persistToLS('lastStep', id);
      persistToLS('lastTimeStarted', timeStarted);
    },
    setStepsHistory: ({ setStepsHistory, timeStarted, step, stepsHistory }) => hist => {
      setStepsHistory(hist);
      persistToLS('lastStepsHistory', hist);
      persistToLS('lastTimeStarted', timeStarted);
    }
  }),
  withHandlers({
    navigateToStep: ({ setStep, setStepsHistory, timeStarted }) => stepId => {
      setStep(stepId);
      setStepsHistory([]);
      persistToLS('lastStepsHistory', []);
      persistToLS('lastStep', stepId);
      persistToLS('lastTimeStarted', timeStarted);
    }
  }),
  pure,
)(({
  started, setStarted,
  timeStarted, setTimeStarted,
  step, setStep,
  stepsHistory,
  setStepsHistory,
  navigateToStep
}) => (
  <div>
    <h3>RBR Демо-скрипт </h3>
    <div style={{ display: 'flex' }}>
      <div>
        <ConversationScript
          scriptData={SCRIPT_DATA}
          step={step}
          setStep={setStep}
          started={started}
          setStarted={setStarted}
          timeStarted={timeStarted}
          setTimeStarted={setTimeStarted}
          stepsHistory={stepsHistory}
          setStepsHistory={setStepsHistory}
        />
      </div>
      {started &&
        <div style={{ width: "100%" }}>
          <ConversationScriptGraph
            scriptData={SCRIPT_DATA}
            step={step}
            setStep={setStep}
            navigateToStep={navigateToStep}
            started={started}
            setStarted={setStarted}
            timeStarted={timeStarted}
            setTimeStarted={setTimeStarted}
            stepsHistory={stepsHistory}
            setStepsHistory={setStepsHistory}
          />
        </div>
      }
    </div>
  </div>
));
