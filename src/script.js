'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const fishSize = 100;
const fishCount = 10;
const urchinCount = 10;
const gameDuration = 10; // 게임 진행 시간 설정 (10초)

const gameBtn = document.querySelector('.game__btn');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popup = document.querySelector('.popup');
const popupMsg = document.querySelector('.popup__msg');
const popupReplay = document.querySelector('.popup__replay');

const bgSound = new Audio('../sound/bg.mp3');
const fishSound = new Audio('../sound/fish_pull.mp3');
const urchinSound = new Audio('../sound/urchin_pull.mp3');
const alertSound = new Audio('../sound/alert.wav');
const winSound = new Audio('../sound/game_win.mp3');

let started = false; // 게임 시작 여부
let score = fishCount; // 남은 당근 갯수
let timer = undefined; // 타이머 상태

// 게임 시작
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame(); // 게임 시작 시 진행 상황 초기화
  } else {
    startGame();
  }
});

function startGame() {
  started = true; // 게임이 시작되었음
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false; // 게임이 끝났음
  stopGameTimer();
  hideStartBtn();
  showPopup('REPLAY ❓');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideStartBtn();
  stopGameTimer();
  if (win) {
    playSound(winSound);
  } else {
    playSound(urchinSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopup(win ? 'YOU WON 🎉' : 'YOU LOST 💀');
}

// 시작 버튼 클릭 시 정지 버튼으로 변경
function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-solid');
  icon.classList.add('fa-pause');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function hideStartBtn() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

// 남은 시간을 알려주는 타이머
function startGameTimer() {
  let remainingTime = gameDuration;
  updateTimer(remainingTime); // 남은 시간 10초부터 시작

  // 나중에 타이머를 중지시켜야 하기 때문에
  // 기존에 선언한 timer 변수를 활용하여 전역적으로 사용할 수 있게끔
  timer = setInterval(() => {
    if (remainingTime === 0) {
      clearInterval(timer);
      finishGame(score === 0);
      return;
    }
    updateTimer(--remainingTime); // 남은 시간 1초씩 감소
  }, 1000); // 1초마다 실행
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimer(time) {
  gameTimer.innerHTML = `00:${time < 10 ? `0${time}` : `${time}`}`;
  time--; // time 1씩 감소
}

function showPopup(msg) {
  popupMsg.innerText = msg;
  popup.classList.remove('hide');
}

function hidePopup() {
  popup.classList.add('hide');
}

function initGame() {
  // 게임 시작 시 진행 상황 초기화
  field.innerHTML = '';
  gameScore.innerText = fishCount;
  score = fishCount;

  // 이미지 생성 후 field에 랜덤하게 추가
  createItem('fish', fishCount, 'img/fish.png');
  createItem('urchin', urchinCount, 'img/urchin.png');
}

// 이미지를 동적으로 생성하여 랜덤 배치해주는 함수
function createItem(className, count, imgPath) {
  const minX = 0;
  const minY = 0;
  const maxX = fieldRect.width - fishSize; // 아이템들의 위치가 영역을 벗어나지 않도록
  const maxY = fieldRect.height - fishSize; // 최댓값에서 이미지의 크기만큼 빼줌 (조금 여유있게)

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className); // 매개변수로 전달한 className
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';

    const x = randomPosition(minX, maxX);
    const y = randomPosition(minY, maxY);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

// 아이템들을 랜덤으로 배치시킬 영역의 최소, 최대 범위 지정
function randomPosition(min, max) {
  return Math.random() * (max - min) + min;
}

// 게임 진행
// 필드에 클릭 이벤트 리스너 등록, 콜백함수 형태로 전달
// field.addEventListener('click', (event) => { onFieldClick(event) });
field.addEventListener('click', onFieldClick);
function onFieldClick(e) {
  if (!started) {
    return; // 게임 시작 시에만 클릭 이벤트가 발생하도록
  }
  const target = e.target;
  if (target.matches('.fish')) {
    target.remove(); // 클릭한 물고기 삭제
    playSound(fishSound);
    score--; // 남은 물고기 수 1씩 감소
    updateScore();
    if (score === 0) {
      finishGame(true); // 게임 승리
    }
  } else if (target.matches('.urchin')) {
    finishGame(false); // 게임 패배
  }
}

// 각종 사운드 재생
function playSound(sound) {
  sound.currentTime = 0; // 음악 재생 시간 초기화
  sound.play();
}

// 사운드 정지
function stopSound(sound) {
  sound.pause();
}

function updateScore() {
  gameScore.innerText = score;
}

popupReplay.addEventListener('click', () => {
  startGame();
  hidePopup();
  showStopBtn();
});

// 브라우저 크기가 1024px보다 작아졌을 시, 안내 문구 보여주기
if (window.innerWidth < 1024) document.querySelector('.guide').classList.remove('hide');
window.addEventListener('resize', () => window.location.reload());
document.addEventListener('contextmenu', e => e.preventDefault());
