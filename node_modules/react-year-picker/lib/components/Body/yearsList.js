"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _year = require("./year");

var _year2 = _interopRequireDefault(_year);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function YearsList(_ref) {
  var selectedYear = _ref.selectedYear,
      choiseYear = _ref.choiseYear;

  var startYear = selectedYear - 4;
  var yearsArray = Array.from(new Array(9), function (val, index) {
    return index + startYear;
  });

  return yearsArray.map(function (item) {
    return _react2.default.createElement(_year2.default, {
      key: item,
      choiseYear: choiseYear,
      selectedYear: selectedYear,
      year: item
    });
  });
}

exports.default = YearsList;