'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raCore = require('ra-core');

var _pickers = require('@material-ui/pickers');

var _core = require('@material-ui/core');

var _dateFns = require('@date-io/date-fns');

var _dateFns2 = _interopRequireDefault(_dateFns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RangePicker = function RangePicker(_ref) {
    var Component = _ref.Component,
        props = _objectWithoutProperties(_ref, ['Component']);

    var options = props.options,
        labelStart = props.labelStart,
        labelEnd = props.labelEnd,
        sourceStart = props.sourceStart,
        sourceEnd = props.sourceEnd,
        resource = props.resource,
        className = props.className,
        isRequired = props.isRequired,
        providerOptions = props.providerOptions,
        fullWidth = props.fullWidth,
        onChange = props.onChange;


    var translate = (0, _raCore.useTranslate)();

    var _useInput = (0, _raCore.useInput)({ source: sourceStart }),
        inputStart = _useInput.input;

    var _useInput2 = (0, _raCore.useInput)({ source: sourceEnd }),
        inputEnd = _useInput2.input;

    var handleChange = (0, _react.useCallback)(function (value) {
        onChange(value);

        if (null !== value[0]) Date.parse(value[0]) ? inputStart.onChange(value[0].toISOString()) : inputStart.onChange(null);
        if (null !== value[1]) Date.parse(value[1]) ? inputEnd.onChange(value[1].toISOString()) : inputEnd.onChange(null);
    }, [inputStart, inputEnd]);

    return _react2.default.createElement(
        'div',
        { className: 'picker' },
        _react2.default.createElement(
            _pickers.LocalizationProvider,
            providerOptions,
            _react2.default.createElement(Component, _extends({}, options, {
                startText: _react2.default.createElement(_raCore.FieldTitle, {
                    label: labelStart,
                    source: sourceStart,
                    resource: resource,
                    isRequired: isRequired
                }),
                endText: _react2.default.createElement(_raCore.FieldTitle, {
                    label: labelEnd,
                    source: sourceEnd,
                    resource: resource,
                    isRequired: isRequired
                }),
                margin: 'normal',
                className: className,
                value: [inputStart.value ? new Date(inputStart.value) : null, inputEnd.value ? new Date(inputEnd.value) : null],
                clearText: translate('ra.action.clear_input_value'),
                cancelText: translate('ra.action.cancel'),
                onChange: function onChange(date) {
                    return handleChange(date);
                },
                renderInput: function renderInput(startProps, endProps) {
                    return _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement(_core.TextField, _extends({}, startProps, {
                            margin: 'normal',
                            variant: 'filled',
                            fullWidth: fullWidth })),
                        _react2.default.createElement(
                            _pickers.DateRangeDelimiter,
                            null,
                            ' to '
                        ),
                        _react2.default.createElement(_core.TextField, _extends({}, endProps, {
                            margin: 'normal',
                            variant: 'filled',
                            fullWidth: fullWidth }))
                    );
                }
            }))
        )
    );
};

RangePicker.propTypes = {
    input: _propTypes2.default.object,
    isRequired: _propTypes2.default.bool,
    labelStart: _propTypes2.default.string,
    labelEnd: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    sourceStart: _propTypes2.default.string,
    sourceEnd: _propTypes2.default.string,
    labelTime: _propTypes2.default.string,
    className: _propTypes2.default.string,
    providerOptions: _propTypes2.default.shape({
        dateAdapter: _propTypes2.default.func,
        dateLibInstance: _propTypes2.default.func,
        locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
    }),
    fullWidth: _propTypes2.default.bool,
    onChange: _propTypes2.default.func
};

RangePicker.defaultProps = {
    input: {},
    isRequired: false,
    meta: { touched: false, error: false },
    options: {},
    resource: '',
    sourceStart: '',
    sourceEnd: '',
    labelTime: '',
    className: '',
    providerOptions: {
        dateAdapter: _dateFns2.default,
        locale: undefined
    },
    fullWidth: false,
    onChange: function onChange() {}
};

exports.default = RangePicker;
module.exports = exports['default'];