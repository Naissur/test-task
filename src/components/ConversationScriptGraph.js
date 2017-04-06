import React, { PropTypes } from 'react';
import { pure, compose, setPropTypes, withState, withHandlers } from 'recompose';

import { keys, dissoc } from 'ramda';

const getScriptGraphStep = ({ scriptData, stepId }) => {
  const caption = scriptData[stepId].line;
  const { replies } = scriptData[stepId];
  const replyKeys = keys(replies);

  const stepReplies = replyKeys.map(replyKey => {
    const reply = replies[replyKey];

    return (`
      ${stepId}["${caption}"]-- "${reply.line}" -->${reply.to};
    `);
  }).join('');

  return `
    ${stepId}["${caption}"];
    ${stepReplies}
  `;
}

const ConversationScriptGraph = compose(
  setPropTypes({
    scriptData: PropTypes.object.isRequired
  }),
  withState('html', 'setHTML', `<div style="color: grey">-not rendered yet-</div>`),
  withHandlers({
    renderHTML: ({ scriptData, setHTML, html, step }) => ({ navigateToStep }) => {
      // remove prev event listeners
      const allNodes = document.querySelectorAll('.mermaid .node');
      allNodes.forEach(node => { node.onclick = () => {}; })

      // build graph description
      const stepsKeys = keys(dissoc('firstStep', scriptData));

      const graphDef = `
        graph TB;
        ${stepsKeys.map(stepId => (getScriptGraphStep({ scriptData, stepId }))).join('')}
      `;

      const graph = mermaidAPI.render('graphDiv', graphDef, resHTML => {
        if (html !== resHTML) {
          setHTML(resHTML);
        }
      });

      // map event handlers

      allNodes.forEach(node => {
        const rect =  node.querySelector('rect');

        if (node.id === step) {
          rect.style.fill = '#cff78c';
        } else {
          rect.style.fill = '#ECECFF';
        }

        node.style.cursor = 'pointer';
        node.onclick = () => {
          navigateToStep(node.id)
        };
      })

    }
  }),
  pure
)(({ scriptData, setHTML, html, renderHTML, navigateToStep, step }) => {
  setTimeout(() => {
    renderHTML({navigateToStep, step});
  }, 0);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className="mermaid"/>
  );
});

export default ConversationScriptGraph;
