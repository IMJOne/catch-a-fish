'use strict';

import Popup from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishPopup = new Popup();
const game = new GameBuilder() //
  .gameDuration(10)
  .fishCount(10)
  .urchinCount(10)
  .build();

game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'REPLAY ❓';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WON 🎉';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST 💀';
      sound.playUrchin();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishPopup.show(message);
});

// 브라우저 크기가 1024px보다 작아졌을 시, 안내 문구 보여주기
if (window.innerWidth < 1024) document.querySelector('.guide').classList.remove('hide');
window.addEventListener('resize', () => window.location.reload());
document.addEventListener('contextmenu', e => e.preventDefault());
gameFinishPopup.setClickListener(() => game.start());
