import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes } from 'recompose';

const ScriptStep = compose(
  setPropTypes({
    scriptData: PropTypes.object.isRequired,
    stepId: PropTypes.string.isRequired,
    onReplyClicked: PropTypes.func.isRequired
  }),
  pure
)(({ stepId, scriptData, onReplyClicked }) => {
  const data = scriptData[stepId];
  const { replies } = data;

  if (Object.values(replies).length === 0) {
    return (
      <div>
        Мы: {data.line}
        <br/>
        - Конец -
      </div>
    );
  }

  return (
    <div>
      Мы: {data.line}

      <br/>

      Клиент: {Object.values(replies).map(reply => (
        <button
          onClick={() => onReplyClicked(stepId, reply.id)}
        >
          {reply.line}
        </button>
      ))}
    </div>
  );
});

export default ScriptStep;
