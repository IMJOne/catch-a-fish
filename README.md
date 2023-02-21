![fish](https://user-images.githubusercontent.com/110226567/213706360-87de7b9a-53ff-42d0-94ed-a0df788f815d.png)

# 🐟 Catch the fish!

물고기를 잡아라! 게임 👉 [Demo](https://imjone.github.io/catch-the-fish/)

<br />

## 📢 프로젝트 개요

주어진 시간 내에 성게를 피해 물고기를 클릭하는 게임입니다.<br />
바닐라 자바스크립트로 간단한 게임을 만들어보면 실력 향상에 정말 도움이 많이 된다는 글을 보고,<br />
비록 기능이 많진 않더라도 끝까지 포기하지 않고 핵심 기능 위주로 구현해보자는 목표를 잡고 진행하게 되었습니다.

<br />

## 🗨️ 사용 기술

<p>
  <img src="https://img.shields.io/badge/HTML-e34f26?style=flat-square&logo=HTML5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS-1572b6?style=flat-square&logo=CSS3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=JavaScript&logoColor=white" />
</p>

<br />

## 📋 주요 기능

- 남은 시간을 알려주는 타이머 작동
- 게임 시작 시 물고기 및 성게 랜덤 배치
- 물고기 클릭 시 요소 삭제 및 카운트 감소
- 성게 클릭 혹은 타임 아웃 시 게임 종료
- 게임 결과에 따라 적절한 팝업창 노출
- 리플레이 버튼을 통해 게임 다시 시작
- 배경음 및 효과음 재생

<br />

## 💻 소스 코드

전체 코드 보러 가기 👉 [Notion](https://www.notion.so/imjone/Catch-the-fish-0f2e6609e83d43e2838d933a9c9c5b39?pvs=4)

### 📍 이미지 랜덤 배치

`Field` 클래스의 멤버 메소드인 `createItem()` 함수를 통해 이미지를 랜덤한 위치에 배치합니다.<br />
인자로 전달 받은 물고기와 성게의 개수 만큼 반복문을 돌며 `img` 요소를 동적으로 생성하며,<br />
게임 필드의 범위를 벗어나지 않도록 `randomPosition()` 함수를 통해 최대 범위를 지정해줍니다.<br />
지정된 범위는 각각 `x`, `y` 변수에 할당되며, 이는 곧 생성된 이미지들의 오프셋 값이 됩니다.

```javascript
export default class Field {
  constructor(fishCount, urchinCount) {
    this.fishCount = fishCount;
    this.urchinCount = urchinCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
  }

  init() {
    this.field.innerHTML = '';
    this.createItem('fish', this.fishCount, 'img/fish.png');
    this.createItem('urchin', this.urchinCount, 'img/urchin.png');
  }
  // 이미지를 동적으로 생성하여 랜덤 배치해주는 함수
  createItem(className, count, imgSrc) {
    const minX = 0;
    const minY = 0;
    const maxX = this.fieldRect.width - carrotSize;
    const maxY = this.fieldRect.height - carrotSize;
		// 아이템들의 위치가 영역을 벗어나지 않도록

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className); // 매개변수로 전달한 className
      item.setAttribute('src', imgSrc);
      item.style.position = 'absolute';

      const x = randomPosition(minX, maxX);
      const y = randomPosition(minY, maxY);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

// 아이템들을 랜덤으로 배치시킬 영역의 최소, 최대 범위 지정
function randomPosition(min, max) {
  return Math.random() * (max - min) + min;
}
```

### 📍 게임 결과 팝업창

`Popup` 클래스에서 팝업창과 관련된 모든 메소드를 독립적으로 관리합니다.<br />
`show()` - 인자로 전달 받은 메시지와 함께 팝업창을 화면에 렌더링합니다.<br />
`hide()` - 팝업창을 DOM Tree에서 다시 제거합니다.

```javascript
export default class Popup {
  constructor() {
    this.popup = document.querySelector('.popup');
    this.popupMsg = document.querySelector('.popup__msg');
    this.popupReplay = document.querySelector('.popup__replay');
    this.popupReplay.addEventListener('click', () => {
      this.onClick && this.onClick(); // onClick이 있을 때만 호출
      hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick; // 인자로 전달 받은 값을 멤버 변수에 할당
  }
  show(msg) {
    this.popupMsg.innerText = msg;
    this.popup.classList.remove('hide');
  }
  hide() {
    this.popup.classList.add('hide');
  }
}
```

## 😊 배운 점 및 느낀 점

- 자바스크립트의 다양한 API들을 사용해보고, 리팩토링을 통해 모듈화의 장점과 중요성에 대해 알게 되었습니다.
- 디자인 패턴이나 데이터 타입을 보장하는 방법 등 조금 더 기술적인 부분에 대해 큰 틀을 익힐 수 있어서 좋았습니다.
- 클래스 문법은 아직 익숙하지 않아 코드를 매끄럽게 작성하기가 어려웠습니다. 더 많은 공부와 연습이 필요할 것 같습니다.
