import React, { Component } from 'react';

import ConversationScript from './components/ConversationScript';

export default class App extends Component {
  render() {
    return (
      <ConversationScript
        scriptData={{
          '0': {
            line: 'Hey there!'
          }
        }}
      />
    );
  }
}
