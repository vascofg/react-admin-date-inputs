'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _raCore = require('ra-core');

var _materialUiPickers = require('material-ui-pickers');

var _dateFnsUtils = require('material-ui-pickers/utils/date-fns-utils');

var _dateFnsUtils2 = _interopRequireDefault(_dateFnsUtils);

var _MuiPickersUtilsProvider = require('material-ui-pickers/utils/MuiPickersUtilsProvider');

var _MuiPickersUtilsProvider2 = _interopRequireDefault(_MuiPickersUtilsProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateInputComponent = function (_Component) {
  _inherits(DateInputComponent, _Component);

  function DateInputComponent() {
    _classCallCheck(this, DateInputComponent);

    return _possibleConstructorReturn(this, (DateInputComponent.__proto__ || Object.getPrototypeOf(DateInputComponent)).apply(this, arguments));
  }

  _createClass(DateInputComponent, [{
    key: 'onChange',
    value: function onChange(date) {
      this.props.input.onChange(date);
      this.props.input.onBlur();
    }
  }, {
    key: 'openPicker',
    value: function openPicker() {
      this.picker.open();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          input = _props.input,
          isRequired = _props.isRequired,
          label = _props.label,
          _props$meta = _props.meta,
          touched = _props$meta.touched,
          error = _props$meta.error,
          options = _props.options,
          source = _props.source,
          resource = _props.resource,
          className = _props.className;


      var TextFieldComponent = function TextFieldComponent(_ref) {
        var value = _ref.value;
        return _react2.default.createElement(_TextField2.default, {
          value: value,
          margin: 'normal',
          label: _react2.default.createElement(_raCore.FieldTitle, {
            label: label,
            source: source,
            resource: resource,
            isRequired: isRequired
          }),
          error: !!(touched && error),
          helperText: touched && error,
          onClick: function onClick() {
            return _this2.openPicker();
          },
          className: className
        });
      };

      return _react2.default.createElement(
        'div',
        { className: 'picker' },
        _react2.default.createElement(
          _MuiPickersUtilsProvider2.default,
          { utils: _dateFnsUtils2.default },
          _react2.default.createElement(_materialUiPickers.DatePicker, _extends({}, options, {
            ref: function ref(node) {
              _this2.picker = node;
            },
            TextFieldComponent: TextFieldComponent,
            value: input.value,
            onChange: function onChange(date) {
              return _this2.onChange(date);
            },
            invalidLabel: ''
          }))
        )
      );
    }
  }]);

  return DateInputComponent;
}(_react.Component);

DateInputComponent.propTypes = {
  input: _propTypes2.default.object,
  isRequired: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  meta: _propTypes2.default.object,
  options: _propTypes2.default.object,
  resource: _propTypes2.default.string,
  source: _propTypes2.default.string,
  labelTime: _propTypes2.default.string,
  className: _propTypes2.default.string
};

DateInputComponent.defaultProps = {
  input: {},
  isRequired: 'false',
  label: '',
  meta: { touched: false, error: false },
  options: {},
  resource: '',
  source: '',
  labelTime: '',
  className: ''
};

exports.default = (0, _raCore.addField)(DateInputComponent);
module.exports = exports['default'];