"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("babel-polyfill");

require("element-closest");

require("./index.css");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _YearInput = require("./components/YearInput");

var _YearInput2 = _interopRequireDefault(_YearInput);

var _index = require("./components/PickerPanel/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearPicker = function (_Component) {
  _inherits(YearPicker, _Component);

  function YearPicker(props) {
    _classCallCheck(this, YearPicker);

    var _this = _possibleConstructorReturn(this, (YearPicker.__proto__ || Object.getPrototypeOf(YearPicker)).call(this, props));

    _this.panelPosition = function () {
      var picker = document.querySelector(".year-picker");
      var X = picker.getBoundingClientRect().left; // расстояние от левой стороны окна до левой стороны элемента
      var Y = picker.getBoundingClientRect().bottom; //расстояние от верхней стороны окна до нижней стороны элемента

      var elementHeight = picker.getBoundingClientRect().height; // Высота элемента
      var elementWidth = picker.getBoundingClientRect().width; // Ширина элемента

      var windowHeight = window.innerHeight; //высота окна браузера
      var windowWidth = window.innerWidth; // ширина окна браузера

      var topTrue = Y - elementHeight - 10 > 220;
      var halfTopTrue = Y - elementHeight - 10 > 110;
      var botTrue = windowHeight - Y - 10 > 220;
      var halfBotTrue = windowHeight - Y - 10 > 110;
      var leftTrue = X + elementHeight / 2 > 120;
      var rightTrue = windowWidth - X - elementWidth / 2 > 120;

      if (topTrue && !botTrue && leftTrue && rightTrue) {
        console.log("Сверху  по центру");
        var top = -230;
        var left = -120 + elementWidth / 2;
        _this.setState({ panelTop: top, panelLeft: left });
      } else if (!topTrue && botTrue && rightTrue && leftTrue) {
        console.log("Снизу по центру");
        var _top = elementHeight + 10;
        var _left = -120 + elementWidth / 2;
        _this.setState({ panelTop: _top, panelLeft: _left });
      } else if (halfBotTrue && halfTopTrue && leftTrue && !rightTrue) {
        console.log("Слева по центру");
        var _top2 = -110 + elementHeight / 2;
        var _left2 = -250;
        _this.setState({ panelTop: _top2, panelLeft: _left2 });
      } else if (halfBotTrue && halfTopTrue && !leftTrue && rightTrue) {
        console.log("Справа по центру");
        var _top3 = -110 + elementHeight / 2;
        var _left3 = elementWidth + 10;
        _this.setState({ panelTop: _top3, panelLeft: _left3 });
      } else if (!topTrue && botTrue && leftTrue && !rightTrue) {
        console.log("слева вниз");
        var _top4 = 0;
        var _left4 = -250;
        _this.setState({ panelTop: _top4, panelLeft: _left4 });
      } else if (topTrue && !rightTrue && leftTrue && !botTrue) {
        console.log("слева вверх");
        var _top5 = -220 + elementHeight;
        var _left5 = -250;
        _this.setState({ panelTop: _top5, panelLeft: _left5 });
      } else if (!topTrue && rightTrue && !leftTrue && botTrue) {
        console.log("Справа вниз ");
        var _top6 = 0;
        var _left6 = elementWidth + 10;
        _this.setState({ panelTop: _top6, panelLeft: _left6 });
      } else if (topTrue && rightTrue && !leftTrue && !botTrue) {
        console.log("Справа вверх");
        var _top7 = -220 + elementHeight;
        var _left7 = elementWidth + 10;
        _this.setState({ panelTop: _top7, panelLeft: _left7 });
      }
    };

    _this.openPanel = function (event) {
      _this.panelPosition();
      _this.setState({ panelIsOpen: true });
    };

    _this.closePanel = function (event) {
      _this.setState({ panelIsOpen: false });
    };

    _this.callback = function () {
      if (_this.props.onChange) {
        _this.props.onChange(_this.state.currentYear);
      }
    };

    _this.choiseYear = function (year) {
      _this.setState({
        selectedYear: year,
        currentYear: year,
        yearIsSelected: true
      }, function () {
        return _this.callback();
      });
      _this.closePanel();
    };

    _this.clearYear = function () {
      _this.setState({
        selectedYear: new Date().getFullYear(),
        currentYear: "",
        yearIsSelected: false
      });
    };

    _this.increaseYear = function (event) {
      _this.setState({ selectedYear: _this.state.selectedYear + 1 });
    };

    _this.decreaseYear = function (event) {
      _this.setState({ selectedYear: _this.state.selectedYear - 1 });
    };

    _this.jumpForward = function (event) {
      _this.setState({ selectedYear: _this.state.selectedYear + 5 });
    };

    _this.jumpBackward = function (event) {
      _this.setState({ selectedYear: _this.state.selectedYear - 5 });
    };

    _this.thisYear = function (event) {
      var year = new Date().getFullYear();
      _this.setState({
        currentYear: year,
        selectedYear: year,
        yearIsSelected: true
      });
      _this.closePanel();
    };

    _this.state = {
      currentYear: "",
      yearIsSelected: false,
      selectedYear: new Date().getFullYear(),
      panelIsOpen: false,
      panelTop: 0,
      panelLeft: 0
    };
    return _this;
  }

  _createClass(YearPicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.panelPosition();

      document.addEventListener("scroll", function (event) {
        this.panelPosition();
      }.bind(this));

      document.addEventListener("click", function (event) {
        if (!event.target.closest(".year-picker")) {
          this.closePanel();
        }
      }.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "year-picker" },
        _react2.default.createElement(_YearInput2.default, {
          value: this.state.currentYear,
          openPanel: this.openPanel,
          selected: this.state.yearIsSelected,
          clear: this.clearYear
        }),
        _react2.default.createElement(_index2.default, {
          isOpen: this.state.panelIsOpen,
          selectedYear: this.state.selectedYear,
          currentYear: this.state.currentYear,
          increaseYear: this.increaseYear,
          decreaseYear: this.decreaseYear,
          jumpForward: this.jumpForward,
          jumpBackward: this.jumpBackward,
          thisYear: this.thisYear,
          choiseYear: this.choiseYear,
          top: this.state.panelTop,
          left: this.state.panelLeft
        })
      );
    }
  }]);

  return YearPicker;
}(_react.Component);

exports.default = YearPicker;