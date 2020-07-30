'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangeInput = exports.DateTimeInput = exports.TimeInput = exports.DateInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pickers = require('@material-ui/pickers');

var _RangePicker = require('./RangePicker');

var _RangePicker2 = _interopRequireDefault(_RangePicker);

var _Picker = require('./Picker');

var _Picker2 = _interopRequireDefault(_Picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateInput = exports.DateInput = function DateInput(props) {
  return _react2.default.createElement(_Picker2.default, _extends({ Component: _pickers.DatePicker }, props));
};
var TimeInput = exports.TimeInput = function TimeInput(props) {
  return _react2.default.createElement(_Picker2.default, _extends({ Component: _pickers.TimePicker }, props));
};
var DateTimeInput = exports.DateTimeInput = function DateTimeInput(props) {
  return _react2.default.createElement(_Picker2.default, _extends({ Component: _pickers.DateTimePicker }, props));
};
var DateRangeInput = exports.DateRangeInput = function DateRangeInput(props) {
  return _react2.default.createElement(_RangePicker2.default, _extends({ Component: _pickers.DateRangePicker }, props));
};