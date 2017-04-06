import React, { Component } from 'react';

import ConversationScript from './components/ConversationScript';
import ConversationScriptGraph from './components/ConversationScriptGraph';

const SCRIPT_DATA = {
  firstStep: 'A',
  'A': {
    line: 'Добрый день!',
    replies: {
      'A': { id: 'A', line: 'Привет', to: 'B'},
      'B': { id: 'B', line: 'Пока', to: 'B' }
    }
  },
  'B': {
    line: 'Чем я могу помочь?',
    replies: {
      'A': { id: 'A', line: 'Ничего не работает! Продукт - плохой! Верните деньги, пожалуйста!', to: 'B' },
      'B': { id: 'B', line: 'Продукт отличный, я доволен. Очень доволен.', to: 'D' },
      'C': { id: 'A', line: 'Я хочу закончить ползьование. До свидания, было приятно иметь с вами дело.', to: 'C' },
    }
  },
  'C': {
    line: 'Всего доброго!',
    replies: {}
  },
  'D': {
    line: 'Мы очень рады вашему положительному отзыву. Спасибо за ваши ресурсы!',
    replies: {}
  }
};

export default class App extends Component {
  render() {
    return (
      <div>
        <h3>RBR Демо-скрипт </h3>
        <div style={{ display: 'flex' }}>
          <div>
            <ConversationScript
              scriptData={SCRIPT_DATA}
            />
          </div>
          <div style={{ width: "100%" }}>
            <ConversationScriptGraph
              scriptData={SCRIPT_DATA}
            />
          </div>
        </div>
      </div>
    );
  }
}
