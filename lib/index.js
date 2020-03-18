'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyboardTimeInput = exports.KeyboardDateTimeInput = exports.KeyboardDateInput = exports.DateTimeInput = exports.TimeInput = exports.DateInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raCore = require('ra-core');

var _raUiMaterialui = require('ra-ui-materialui');

var _pickers = require('@material-ui/pickers');

var _dateFns = require('@date-io/date-fns');

var _dateFns2 = _interopRequireDefault(_dateFns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var leftPad = function leftPad() {
    var nb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
    return function (value) {
        return ('0'.repeat(nb) + value).slice(-nb);
    };
};
var leftPad4 = leftPad(4);
var leftPad2 = leftPad(2);

/**
 * @param {Date} value value to convert
 * @returns {String} A standardized datetime (yyyy-MM-ddThh:mm), to be passed to an <input type="datetime-local" />
 */
var convertDateToString = function convertDateToString(value) {
    if (!(value instanceof Date) || isNaN(value.getDate())) {
        return '';
    }

    var yy = leftPad4(value.getFullYear());
    var MM = leftPad2(value.getMonth() + 1);
    var dd = leftPad2(value.getDate());
    var hh = leftPad2(value.getHours());
    var mm = leftPad2(value.getMinutes());
    return yy + '-' + MM + '-' + dd + 'T' + hh + ':' + mm;
};

// yyyy-MM-ddThh:mm
var dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/**
 * Converts a date from the Redux store, with timezone, to a date string
 * without timezone for use in an <input type="datetime-local" />.
 *
 * @param {Date | String} value date string or object
 */
var dateTimeFormatter = function dateTimeFormatter(value) {
    // null, undefined and empty string values should not go through convertDateToString
    // otherwise, it returns undefined and will make the input an uncontrolled one.
    if (value == null || value === '') {
        return '';
    }

    if (value instanceof Date) {
        return convertDateToString(value);
    }

    // valid dates should not be converted
    if (dateTimeRegex.test(value)) {
        return value;
    }

    return convertDateToString(new Date(value));
};

/**
 * Converts a datetime string without timezone to a date object
 * with timezone, using the browser timezone.
 *
 * @param {String} value Date string, formatted as yyyy-MM-ddThh:mm
 * @return {Date}
 */
var dateTimeParser = function dateTimeParser(value) {
    return value ? new Date(value) : '';
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var allowEmpty = _ref.allowEmpty,
        alwaysOn = _ref.alwaysOn,
        basePath = _ref.basePath,
        component = _ref.component,
        defaultValue = _ref.defaultValue,
        format = _ref.format,
        formClassName = _ref.formClassName,
        initialValue = _ref.initialValue,
        initializeForm = _ref.initializeForm,
        input = _ref.input,
        isRequired = _ref.isRequired,
        label = _ref.label,
        limitChoicesToValue = _ref.limitChoicesToValue,
        locale = _ref.locale,
        meta = _ref.meta,
        options = _ref.options,
        optionText = _ref.optionText,
        optionValue = _ref.optionValue,
        parse = _ref.parse,
        record = _ref.record,
        resource = _ref.resource,
        source = _ref.source,
        textAlign = _ref.textAlign,
        translate = _ref.translate,
        translateChoice = _ref.translateChoice,
        labelTime = _ref.labelTime,
        rest = _objectWithoutProperties(_ref, ['allowEmpty', 'alwaysOn', 'basePath', 'component', 'defaultValue', 'format', 'formClassName', 'initialValue', 'initializeForm', 'input', 'isRequired', 'label', 'limitChoicesToValue', 'locale', 'meta', 'options', 'optionText', 'optionValue', 'parse', 'record', 'resource', 'source', 'textAlign', 'translate', 'translateChoice', 'labelTime']);

    return rest;
};

var Picker = function Picker(_ref2) {
    var PickerComponent = _ref2.PickerComponent,
        _ref2$format = _ref2.format,
        format = _ref2$format === undefined ? dateTimeFormatter : _ref2$format,
        label = _ref2.label,
        options = _ref2.options,
        source = _ref2.source,
        resource = _ref2.resource,
        helperText = _ref2.helperText,
        _ref2$margin = _ref2.margin,
        margin = _ref2$margin === undefined ? 'dense' : _ref2$margin,
        onBlur = _ref2.onBlur,
        onChange = _ref2.onChange,
        onFocus = _ref2.onFocus,
        _ref2$parse = _ref2.parse,
        parse = _ref2$parse === undefined ? dateTimeParser : _ref2$parse,
        validate = _ref2.validate,
        _ref2$variant = _ref2.variant,
        variant = _ref2$variant === undefined ? 'filled' : _ref2$variant,
        defaultValue = _ref2.defaultValue,
        _ref2$providerOptions = _ref2.providerOptions,
        utils = _ref2$providerOptions.utils,
        locale = _ref2$providerOptions.locale,
        _ref2$pickerVariant = _ref2.pickerVariant,
        pickerVariant = _ref2$pickerVariant === undefined ? 'dialog' : _ref2$pickerVariant,
        rest = _objectWithoutProperties(_ref2, ['PickerComponent', 'format', 'label', 'options', 'source', 'resource', 'helperText', 'margin', 'onBlur', 'onChange', 'onFocus', 'parse', 'validate', 'variant', 'defaultValue', 'providerOptions', 'pickerVariant']);

    var translate = (0, _raCore.useTranslate)();

    var _useInput = (0, _raCore.useInput)(_extends({
        format: format,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        parse: parse,
        resource: resource,
        source: source,
        validate: validate
    }, rest)),
        id = _useInput.id,
        input = _useInput.input,
        isRequired = _useInput.isRequired,
        _useInput$meta = _useInput.meta,
        error = _useInput$meta.error,
        touched = _useInput$meta.touched;

    var handleChange = (0, _react.useCallback)(function (value) {
        Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
    }, []);

    return _react2.default.createElement(
        _pickers.MuiPickersUtilsProvider,
        { utils: utils || _dateFns2.default, locale: locale },
        _react2.default.createElement(PickerComponent, _extends({
            id: id,
            label: _react2.default.createElement(_raCore.FieldTitle, {
                label: label,
                source: source,
                resource: resource,
                isRequired: isRequired
            }),
            InputLabelProps: {
                shrink: true
            },
            variant: pickerVariant,
            inputVariant: variant,
            margin: margin,
            error: !!(touched && error),
            helperText: _react2.default.createElement(_raUiMaterialui.InputHelperText, {
                touched: touched,
                error: error,
                helperText: helperText
            }),
            clearLabel: translate('ra.action.clear_input_value'),
            cancelLabel: translate('ra.action.cancel')
        }, options, sanitizeRestProps(rest), {
            value: input.value ? new Date(input.value) : null,
            onChange: function onChange(date) {
                return handleChange(date);
            },
            onBlur: function onBlur() {
                return input.onBlur(input.value ? new Date(input.value).toISOString() : null);
            }
        }))
    );
};

Picker.propTypes = {
    PickerComponent: _propTypes2.default.func.isRequired,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    labelTime: _propTypes2.default.string,
    margin: _propTypes2.default.string,
    variant: _propTypes2.default.string,
    className: _propTypes2.default.string,
    providerOptions: _propTypes2.default.shape({
        utils: _propTypes2.default.func,
        locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
    })
};

Picker.defaultProps = {
    isRequired: false,
    label: '',
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

var DateInput = function DateInput(props) {
    return _react2.default.createElement(Picker, _extends({ PickerComponent: _pickers.DatePicker }, props));
};
var TimeInput = function TimeInput(props) {
    return _react2.default.createElement(Picker, _extends({ PickerComponent: _pickers.TimePicker }, props));
};
var DateTimeInput = function DateTimeInput(props) {
    return _react2.default.createElement(Picker, _extends({ PickerComponent: _pickers.DateTimePicker }, props));
};
var KeyboardDateInput = function KeyboardDateInput(props) {
    return _react2.default.createElement(Picker, _extends({ PickerComponent: _pickers.KeyboardDatePicker }, props));
};
var KeyboardDateTimeInput = function KeyboardDateTimeInput(props) {
    return _react2.default.createElement(Picker, _extends({ PickerComponent: _pickers.KeyboardDateTimePicker }, props));
};
var KeyboardTimeInput = function KeyboardTimeInput(props) {
    return _react2.default.createElement(Picker, _extends({ PickerComponent: _pickers.KeyboardTimePicker }, props));
};

DateInput.propTypes = {
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    labelTime: _propTypes2.default.string,
    margin: _propTypes2.default.string,
    variant: _propTypes2.default.string,
    className: _propTypes2.default.string,
    providerOptions: _propTypes2.default.shape({
        utils: _propTypes2.default.func,
        locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
    })
};

TimeInput.propTypes = {
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    labelTime: _propTypes2.default.string,
    margin: _propTypes2.default.string,
    variant: _propTypes2.default.string,
    className: _propTypes2.default.string,
    providerOptions: _propTypes2.default.shape({
        utils: _propTypes2.default.func,
        locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
    })
};

DateTimeInput.propTypes = {
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    labelTime: _propTypes2.default.string,
    margin: _propTypes2.default.string,
    variant: _propTypes2.default.string,
    className: _propTypes2.default.string,
    providerOptions: _propTypes2.default.shape({
        utils: _propTypes2.default.func,
        locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
    })
};

KeyboardDateInput.propTypes = {
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    labelTime: _propTypes2.default.string,
    margin: _propTypes2.default.string,
    variant: _propTypes2.default.string,
    className: _propTypes2.default.string,
    providerOptions: _propTypes2.default.shape({
        utils: _propTypes2.default.func,
        locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
    })
};

KeyboardDateTimeInput.propTypes = {
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    labelTime: _propTypes2.default.string,
    margin: _propTypes2.default.string,
    variant: _propTypes2.default.string,
    className: _propTypes2.default.string,
    providerOptions: _propTypes2.default.shape({
        utils: _propTypes2.default.func,
        locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
    })
};

KeyboardTimeInput.propTypes = {
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    labelTime: _propTypes2.default.string,
    margin: _propTypes2.default.string,
    variant: _propTypes2.default.string,
    className: _propTypes2.default.string,
    providerOptions: _propTypes2.default.shape({
        utils: _propTypes2.default.func,
        locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
    })
};

exports.DateInput = DateInput;
exports.TimeInput = TimeInput;
exports.DateTimeInput = DateTimeInput;
exports.KeyboardDateInput = KeyboardDateInput;
exports.KeyboardDateTimeInput = KeyboardDateTimeInput;
exports.KeyboardTimeInput = KeyboardTimeInput;