import React, { Component } from 'react';

import ConversationScript from './components/ConversationScript';

export default class App extends Component {
  render() {
    return (
      <ConversationScript
        scriptData={{
          '0': {
            line: 'Добрый день!',
            replies: [
              { id: '0', caption: 'Привет', to: '1'},
              { id: '1', caption: 'Пока', to: '2' }
            ]
          },
          '1': {
            line: 'Чем я могу помочь?',
            replies: []
          },
          '2': {
            line: 'Всего доброго, bitch!',
            replies: []
          }
        }}
      />
    );
  }
}
