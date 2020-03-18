import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useInput, useTranslate, FieldTitle} from 'ra-core';
import {InputHelperText} from 'ra-ui-materialui';

import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    KeyboardDatePicker,
    KeyboardDateTimePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const leftPad = (nb = 2) => value => ('0'.repeat(nb) + value).slice(-nb);
const leftPad4 = leftPad(4);
const leftPad2 = leftPad(2);

/**
 * @param {Date} value value to convert
 * @returns {String} A standardized datetime (yyyy-MM-ddThh:mm), to be passed to an <input type="datetime-local" />
 */
const convertDateToString = (value) => {
    if (!(value instanceof Date) || isNaN(value.getDate())) {
        return '';
    }

    const yy = leftPad4(value.getFullYear());
    const MM = leftPad2(value.getMonth() + 1);
    const dd = leftPad2(value.getDate());
    const hh = leftPad2(value.getHours());
    const mm = leftPad2(value.getMinutes());
    return `${yy}-${MM}-${dd}T${hh}:${mm}`;
};

// yyyy-MM-ddThh:mm
const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/**
 * Converts a date from the Redux store, with timezone, to a date string
 * without timezone for use in an <input type="datetime-local" />.
 *
 * @param {Date | String} value date string or object
 */
const dateTimeFormatter = (value) => {
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
const dateTimeParser = (value) => value ? new Date(value) : '';

const sanitizeRestProps = ({
    allowEmpty,
    alwaysOn,
    basePath,
    component,
    defaultValue,
    format,
    formClassName,
    initialValue,
    initializeForm,
    input,
    isRequired,
    label,
    limitChoicesToValue,
    locale,
    meta,
    options,
    optionText,
    optionValue,
    parse,
    record,
    resource,
    source,
    textAlign,
    translate,
    translateChoice,
    labelTime,
    ...rest
}) => rest;

const Picker = ({
    PickerComponent,
    format = dateTimeFormatter,
    label,
    options,
    source,
    resource,
    helperText,
    margin = 'dense',
    onBlur,
    onChange,
    onFocus,
    parse = dateTimeParser,
    validate,
    variant = 'filled',
    defaultValue,
    providerOptions: {utils, locale},
    pickerVariant = 'dialog',
    ...rest
}) => {
    const translate = useTranslate();
    const {
        id,
        input,
    isRequired,
        meta: {error, touched},
    } = useInput({
        format,
        onBlur,
        onChange,
        onFocus,
        parse,
        resource,
        source,
        validate,
        /* type: 'datetime-local', */
        ...rest,
    });

  const handleChange = useCallback(value => {
    Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
  }, []);

  return (
      <MuiPickersUtilsProvider utils={utils || DateFnsUtils} locale={locale}>
        <PickerComponent
            id={id}
          label={<FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />}
            InputLabelProps={{
                shrink: true,
            }}
            variant={pickerVariant}
            inputVariant={variant}
            margin={margin}
          error={!!(touched && error)}
            helperText={
                <InputHelperText
                  touched={touched}
                  error={error}
                  helperText={helperText}
                />
            }
            clearLabel={translate('ra.action.clear_input_value')}
            cancelLabel={translate('ra.action.cancel')}
            {...options}
            {...sanitizeRestProps(rest)}
          value={input.value ? new Date(input.value) : null}
          onChange={date => handleChange(date)}
          onBlur={() => input.onBlur(input.value ? new Date(input.value).toISOString() : null)}
        />
      </MuiPickersUtilsProvider>
    );
};

Picker.propTypes = {
    PickerComponent: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
    onChange: PropTypes.func,
  meta: PropTypes.object,
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
  labelTime: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
  className: PropTypes.string,
  providerOptions: PropTypes.shape({
    utils: PropTypes.func,
    locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
    utils: DateFnsUtils,
    locale: undefined,
  },
};

const DateInput = props => <Picker PickerComponent={DatePicker} {...props} />;
const TimeInput = props => <Picker PickerComponent={TimePicker} {...props} />;
const DateTimeInput = props => <Picker PickerComponent={DateTimePicker} {...props} />;
const KeyboardDateInput = props => <Picker PickerComponent={KeyboardDatePicker} {...props} />;
const KeyboardDateTimeInput = props => <Picker PickerComponent={KeyboardDateTimePicker} {...props} />;
const KeyboardTimeInput = props => <Picker PickerComponent={KeyboardTimePicker} {...props} />;

DateInput.propTypes = {
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        utils: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
};

TimeInput.propTypes = {
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        utils: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
};

DateTimeInput.propTypes = {
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        utils: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
};

KeyboardDateInput.propTypes = {
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        utils: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
};

KeyboardDateTimeInput.propTypes = {
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        utils: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
};

KeyboardTimeInput.propTypes = {
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        utils: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
};

export {
    DateInput,
    TimeInput,
    DateTimeInput,
    KeyboardDateInput,
    KeyboardDateTimeInput,
    KeyboardTimeInput
};
