"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function currentYear(_ref) {
  var year = _ref.year;

  return _react2.default.createElement(
    "span",
    { className: "current-year" },
    year
  );
}

exports.default = currentYear;