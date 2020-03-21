'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeInput = exports.TimeInput = exports.DateInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raCore = require('ra-core');

var _pickers = require('@material-ui/pickers');

var _dateFns = require('@date-io/date-fns');

var _dateFns2 = _interopRequireDefault(_dateFns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Picker = function Picker(_ref) {
  var PickerComponent = _ref.PickerComponent,
      fieldProps = _objectWithoutProperties(_ref, ['PickerComponent']);

  var options = fieldProps.options,
      label = fieldProps.label,
      source = fieldProps.source,
      resource = fieldProps.resource,
      className = fieldProps.className,
      isRequired = fieldProps.isRequired,
      providerOptions = fieldProps.providerOptions;

  var _useInput = (0, _raCore.useInput)({ source: source }),
      input = _useInput.input,
      meta = _useInput.meta;

  var touched = meta.touched,
      error = meta.error;


  var handleChange = (0, _react.useCallback)(function (value) {
    Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
  }, []);

  return _react2.default.createElement(
    'div',
    { className: 'picker' },
    _react2.default.createElement(
      _pickers.MuiPickersUtilsProvider,
      providerOptions,
      _react2.default.createElement(PickerComponent, _extends({}, options, {
        label: _react2.default.createElement(_raCore.FieldTitle, {
          label: label,
          source: source,
          resource: resource,
          isRequired: isRequired
        }),
        margin: 'normal',
        error: !!(touched && error),
        helperText: touched && error,
        className: className,
        value: input.value ? new Date(input.value) : null,
        onChange: function onChange(date) {
          return handleChange(date);
        },
        onBlur: function onBlur() {
          return input.onBlur(input.value ? new Date(input.value).toISOString() : null);
        }
      }))
    )
  );
};

Picker.propTypes = {
  input: _propTypes2.default.object,
  isRequired: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  meta: _propTypes2.default.object,
  options: _propTypes2.default.object,
  resource: _propTypes2.default.string,
  source: _propTypes2.default.string,
  labelTime: _propTypes2.default.string,
  className: _propTypes2.default.string,
  providerOptions: _propTypes2.default.shape({
    utils: _propTypes2.default.func,
    locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
  })
};

Picker.defaultProps = {
  input: {},
  isRequired: false,
  meta: { touched: false, error: false },
  options: {},
  resource: '',
  source: '',
  labelTime: '',
  className: '',
  providerOptions: {
    utils: _dateFns2.default,
    locale: undefined
  }
};

var DateInput = exports.DateInput = function DateInput(props) {
  return _react2.default.createElement(Picker, _extends({ PickerComponent: _pickers.DatePicker }, props));
};
var TimeInput = exports.TimeInput = function TimeInput(props) {
  return _react2.default.createElement(Picker, _extends({ PickerComponent: _pickers.TimePicker }, props));
};
var DateTimeInput = exports.DateTimeInput = function DateTimeInput(props) {
  return _react2.default.createElement(Picker, _extends({ PickerComponent: _pickers.DateTimePicker }, props));
};