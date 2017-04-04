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

  return (
    <div>
      Script Step
      <br />
      <br />

      Line: "{data.line}"
    </div>
  );
});

export default ScriptStep;
