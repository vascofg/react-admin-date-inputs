import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addField, FieldTitle } from 'ra-core';
import { DatePicker, TimePicker, DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

const makePicker = (PickerComponent) => {
  class _makePicker extends Component {
    onChange(date) {
      this.props.input.onChange(date);
      this.props.input.onBlur();
    }

    render() {
      const {
        input,
        options,
        locale,
        label,
        source,
        resource,
        isRequired,
        className,
        meta,
        utils,
      } = this.props;

      const { touched, error } = meta;

      return (
        <div className="picker">
          <MuiPickersUtilsProvider utils={utils} locale={locale}>
            <PickerComponent
              {...options}
              label={<FieldTitle
                label={label}
                source={source}
                resource={resource}
                isRequired={isRequired}
              />}
              margin="normal"
              error={!!(touched && error)}
              helperText={touched && error}
              ref={(node) => { this.picker = node; }}
              className={className}
              value={input.value ? input.value : null}
              onChange={date => this.onChange(date)}
            />
          </MuiPickersUtilsProvider>
        </div>
      );
    }
  }
  _makePicker.propTypes = {
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    className: PropTypes.string,
    locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    utils: PropTypes.func,
  };

  _makePicker.defaultProps = {
    input: {},
    isRequired: 'false',
    label: '',
    meta: { touched: false, error: false },
    options: {},
    resource: '',
    source: '',
    labelTime: '',
    className: '',
    locale: undefined,
    utils: DateFnsUtils,
  };
  return _makePicker;
};

export const DateInput = addField(makePicker(DatePicker));
export const TimeInput = addField(makePicker(TimePicker));
export const DateTimeInput = addField(makePicker(DateTimePicker));
