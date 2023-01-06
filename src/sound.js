'use strict';

const fishSound = new Audio('../sound/fish_pull.mp3');
const bgSound = new Audio('../sound/bg.mp3');
const urchinSound = new Audio('../sound/urchin_pull.mp3');
const alertSound = new Audio('../sound/alert.wav');
const winSound = new Audio('../sound/game_win.mp3');

// 각종 사운드 재생
function playSound(sound) {
  sound.currentTime = 0; // 음악 재생 시간 초기화
  sound.play();
}

// 사운드 정지
function stopSound(sound) {
  sound.pause();
}

export function playFish() {
  playSound(fishSound);
}

export function playBackground() {
  playSound(bgSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

export function playUrchin() {
  playSound(urchinSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playWin() {
  playSound(winSound);
}
