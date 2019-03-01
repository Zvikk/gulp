"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('from main', true);

var Module = function Module() {
  _classCallCheck(this, Module);

  this.x = 5;
  console.log(this);
};

var _module = new Module();

console.log('from module');