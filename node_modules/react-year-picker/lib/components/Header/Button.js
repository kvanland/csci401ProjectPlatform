"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = require("react-fontawesome");

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Button(_ref) {
  var direction = _ref.direction,
      onClick = _ref.onClick;

  var icon = direction === "forward" ? "angle-right" : "angle-left";
  var buttonClass = direction === "forward" ? "nav-button-next" : "nav-button-back";
  function handlerClick(e) {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  }

  return _react2.default.createElement(
    "button",
    { className: "nav-button  " + buttonClass, onClick: handlerClick },
    _react2.default.createElement(_reactFontawesome2.default, { name: icon, size: "2x" })
  );
}

exports.default = Button;