'use strict';
const p_btn = document.querySelector('.p-btn');
const n_btn = document.querySelector('.n-btn');

// IO
const callback = (entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('current');
      if(entry.target.previousElementSibling != null) {
        entry.target.previousElementSibling.classList.add('prev');
      }
      if(entry.target.nextElementSibling != null) {
        entry.target.nextElementSibling.classList.add('next');
      }
    } else {
      entry.target.classList.remove('current');
      if(entry.target.previousElementSibling != null) {
        entry.target.previousElementSibling.classList.remove('prev');
      }
      if(entry.target.nextElementSibling != null) {
        entry.target.nextElementSibling.classList.remove('next');
      }
    }
  })
}
const options = {
  threshold: 1
};
const io = new IntersectionObserver(callback, options);
const targets = document.querySelectorAll('.item');
targets.forEach((target) => {
  io.observe(target);
})

// button
let width = window.innerWidth;
window.addEventListener('resize', () => {
  width = window.innerWidth;
})

function go_prev() {
  // scroll-snap-type off
  $('.item-wrap').css('scroll-snap-type', 'none');
  // スクロール処理
  var num = $('.prev').attr('id');
  var dist = width * num;
  $('.item-wrap').animate({
    scrollLeft: dist
  }, 300, 'swing');
  // スクロール中クリックイベントを削除
  $(p_btn).off();
  $(n_btn).off();
  // スクロール完了後クリックイベントを再追加
  setTimeout(() => {
    $('.item-wrap').css('scroll-snap-type', 'x mandatory');
    $(p_btn).on('click', go_prev);
    $(n_btn).on('click', go_next);
  }, 300);
}

$(function() {
  $(p_btn).on('click', go_prev);
})

function go_next() {
  // scroll-snap-type off
  $('.item-wrap').css('scroll-snap-type', 'none');
  // スクロール処理
  var num = $('.next').attr('id');
  var dist = width * num;
  $('.item-wrap').animate({
    scrollLeft: dist
  }, 300, 'swing');
  // スクロール完了後クリックイベントを削除
  $(n_btn).off();
  $(p_btn).off();
  // スクロール完了後クリックイベントを再追加
  setTimeout(() => {
    $('.item-wrap').css('scroll-snap-type', 'x mandatory');
    $(n_btn).on('click', go_next);
    $(p_btn).on('click', go_prev);
  }, 300);
}

$(() => {
  $(n_btn).on('click', go_next);
})

