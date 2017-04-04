import React, { Component } from 'react';

import ConversationScript from './components/ConversationScript';

export default class App extends Component {
  render() {
    return (
      <ConversationScript
        scriptData={{
          '0': {
            line: 'Hey there!',
            replies: [
              { id: '0', caption: 'Hey' },
              { id: '1', caption: 'Hey there' },
              { id: '2', caption: 'Hey there, wazzup?' },
            ]
          }
        }}
      />
    );
  }
}
