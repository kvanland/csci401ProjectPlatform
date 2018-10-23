"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Year(_ref) {
  var year = _ref.year,
      selectedYear = _ref.selectedYear,
      choiseYear = _ref.choiseYear;

  var selectedYearClass = year === selectedYear ? "selected-year" : "";

  function clickHandler(event) {
    choiseYear(year);
  }

  return _react2.default.createElement(
    "div",
    { className: "year-wrapper", year: year },
    _react2.default.createElement(
      "a",
      { onClick: clickHandler, className: "year " + selectedYearClass },
      year
    )
  );
}

exports.default = Year;