'use strict';

import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    this.fishCount;
    return this; // 클래스 자체를 return
  }

  fishCount(num) {
    this.fishCount = num;
    return this;
  }

  urchinCount(num) {
    this.urchinCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.fishCount,
      this.urchinCount
    );
  }
}

export class Game {
  constructor(gameDuration, fishCount, urchinCount) {
    this.gameDuration = gameDuration;
    this.fishCount = fishCount;
    this.urchinCount = urchinCount;

    this.started = false; // 게임 시작 여부
    this.score = fishCount; // 남은 물고기 갯수
    this.timer = undefined; // 타이머 상태

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__btn');
    this.gameBtn.addEventListener('click', () => {
      // 게임 시작
      if (this.started) {
        this.stop(Reason.cancel); // 게임 시작 시 진행 상황 초기화
      } else {
        this.start();
      }
    });

    this.gameField = new Field(fishCount, urchinCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  // 게임 진행
  start() {
    this.started = true; // 게임이 시작되었음
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  // 게임 종료
  stop(reason) {
    this.started = false; // 게임이 끝났음
    this.stopGameTimer();
    this.hideStartBtn();
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = item => {
    if (!this.started) {
      return; // 게임 시작 시에만 클릭 이벤트가 발생하도록
    }
    if (item === ItemType.fish) {
      this.score--;
      this.updateScore();
      if (this.score === 0) {
        this.stop(Reason.win); // 게임 승리
      }
    } else if (item === ItemType.urchin) {
      this.stop(Reason.lose); // 게임 패배
    }
  };

  // 시작 버튼 클릭 시 정지 버튼으로 변경
  showStopBtn() {
    const icon = this.gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-pause');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideStartBtn() {
    this.gameBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  initGame() {
    // 게임 시작 시 진행 상황 초기화
    this.gameScore.innerText = this.fishCount;
    this.score = this.fishCount;
    this.gameField.init();
  }

  startGameTimer() {
    // 남은 시간을 알려주는 타이머
    let remainingTime = this.gameDuration;
    this.updateTimer(remainingTime); // 남은 시간 10초부터 시작

    // 나중에 타이머를 중지시켜야 하기 때문에
    // 기존에 선언한 timer 변수를 활용하여 전역적으로 사용할 수 있게끔
    this.timer = setInterval(() => {
      if (remainingTime === 0) {
        clearInterval(this.timer);
        this.stop(this.score === 0 ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimer(--remainingTime); // 남은 시간 1초씩 감소
    }, 1000); // 1초마다 실행
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimer(time) {
    this.gameTimer.innerHTML = `00:${time < 10 ? `0${time}` : `${time}`}`;
    this.time--; // time 1씩 감소
  }

  updateScore() {
    this.gameScore.innerText = this.score;
  }
}
