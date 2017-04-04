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

  return (
    <div>
      <br />
      Мы: "{data.line}"

      <br/>
      <br/>

      Клиент: {replies.map(reply => (
        <button
          onClick={() => onReplyClicked(stepId, reply.to)}
        >
          {reply.caption}
        </button>
      ))}
    </div>
  );
});

export default ScriptStep;
