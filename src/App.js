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
            replies: {
              '0': { id: '0', line: 'Ничего не работает! Продукт - плохой! Верните деньги, пожалуйста!', to: '2' },
              '1': { id: '1', line: 'Продукт отличный, я доволен. Очень доволен.', to: '3' }
            }
          },
          '2': {
            line: 'Всего доброго, bitch!',
            replies: {}
          },
          '3': {
            line: 'Мы очень рады доставить вам потребительское удовольствие. Спасибо за ваше время.',
            replies: {}
          }
        }}
      />
    );
  }
}
