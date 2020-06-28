(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

document.addEventListener("DOMContentLoaded", function () {
  var scrollUp = document.getElementById('scrollup');

  if (scrollUp) {
    window.addEventListener('scroll', function () {
      var scrollPosition = window.pageYOffset | document.body.scrollTop;

      if (scrollPosition > 300) {
        scrollUp.classList.add('scroll-on');
      } else {
        scrollUp.classList.remove('scroll-on');
      }
    });
    scrollUp.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

},{}]},{},[1]);
