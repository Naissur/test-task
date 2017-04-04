import React, { Component } from 'react';

import ConversationScript from './components/ConversationScript';

export default class App extends Component {
  render() {
    return (
      <ConversationScript
        scriptData={{
          '0': {
            line: 'Добрый день!',
            replies: {
              '0': { id: '0', line: 'Привет', to: '1'},
              '1': { id: '1', line: 'Пока', to: '2' }
            }
          },
          '1': {
            line: 'Чем я могу помочь?',
            replies: {}
          },
          '2': {
            line: 'Всего доброго, bitch!',
            replies: {}
          }
        }}
      />
    );
  }
}
