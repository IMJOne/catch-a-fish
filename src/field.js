'use strict';

import * as sound from './sound.js';

const fishSize = 100;

export const ItemType = Object.freeze({
  fish: 'fish',
  urchin: 'urchin',
});

export class Field {
  constructor(fishCount, urchinCount) {
    // 멤버 변수
    this.fishCount = fishCount;
    this.urchinCount = urchinCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  // 멤버 메소드
  init() {
    this.field.innerHTML = '';
    this.createItem('fish', this.fishCount, 'img/fish.png');
    this.createItem('urchin', this.urchinCount, 'img/urchin.png');
  }

  // 이미지를 동적으로 생성하여 랜덤 배치해주는 함수
  createItem(className, count, imgSrc) {
    const minX = 0;
    const minY = 0;
    const maxX = this.fieldRect.width - fishSize; // 아이템들의 위치가 영역을 벗어나지 않도록
    const maxY = this.fieldRect.height - fishSize; // 최댓값에서 이미지의 크기만큼 빼줌

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className); // 매개변수로 전달한 className
      item.setAttribute('src', imgSrc);
      item.style.position = 'absolute';

      let x = randomPosition(minX, maxX);
      let y = randomPosition(minY, maxY);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  setClickListener(onItemClick) {
    // 매개변수로 받아온 onItemClick 함수의 메모리 주소를 멤버 변수에 할당
    this.onItemClick = onItemClick;
  }

  onClick = e => {
    const target = e.target;
    if (target.matches('.fish')) {
      target.remove(); // 클릭한 물고기 삭제
      sound.playFish();
      this.onItemClick && this.onItemClick(ItemType.fish);
    } else if (target.matches('.urchin')) {
      this.onItemClick && this.onItemClick(ItemType.urchin);
    } else {
      return;
    }
  };
}

// 아이템들을 랜덤으로 배치시킬 영역의 최소, 최대 범위 지정
function randomPosition(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
