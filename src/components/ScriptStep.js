import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes } from 'recompose';

const ScriptStep = compose(
  setPropTypes({
    scriptData: PropTypes.object.isRequired,
    stepId: PropTypes.string.isRequired
  }),
  pure
)(({ stepId, scriptData }) => {
  const data = scriptData[stepId];
  const { replies } = data;

  return (
    <div>
      <br />
      Фраза: "{data.line}"

      <br/>
      <br/>

      {replies.map(reply => (
        <button>{reply.caption}</button>
      ))}
    </div>
  );
});

export default ScriptStep;
