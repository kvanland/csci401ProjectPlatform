"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function YearInput(_ref) {
  var value = _ref.value,
      openPanel = _ref.openPanel,
      selected = _ref.selected,
      clear = _ref.clear;

  var selectedClass = selected ? "imput-wrapper-selected" : "";

  function clearHandler(e) {
    clear();
  }

  return _react2.default.createElement(
    "div",
    { className: "input-wrapper " + selectedClass },
    _react2.default.createElement("input", {
      className: "year-input",
      value: value,
      onClick: openPanel,
      placeholder: "Select",
      readOnly: true
    }),
    _react2.default.createElement("i", {
      name: "times",
      className: "input-icon input-icon-calendar fa fa-calendar"
    }),
    _react2.default.createElement("i", {
      name: "calendar",
      className: "input-icon input-icon-close fa fa-times",
      onClick: clearHandler
    })
  );
}

exports.default = YearInput;