'use strict';

// 외부에서도 해당 클래스에 접근이 가능하도록 바깥으로 노출시킴
export default class Popup {
  constructor() {
    // 멤버 변수
    this.popup = document.querySelector('.popup');
    this.popupMsg = document.querySelector('.popup__msg');
    this.popupReplay = document.querySelector('.popup__replay');
    this.popupReplay.addEventListener('click', () => {
      this.onClick && this.onClick(); // onClick이 있을 때만 호출
      this.hide();
    });
  }

  // 멤버 메소드
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
