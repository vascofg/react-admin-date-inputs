import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addField, FieldTitle } from 'ra-core';
import { DatePicker } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

class DateInputComponent extends Component {
  onChange(date) {
    this.props.input.onChange(date);
    this.props.input.onBlur();
  }

  render() {
    const {
      input,
      options,
      label,
      source,
      resource,
      isRequired,
      className,
    } = this.props;

    return (
      <div className="picker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            {...options}
            label={<FieldTitle
              label={label}
              source={source}
              resource={resource}
              isRequired={isRequired}
            />}
            margin="normal"
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

DateInputComponent.propTypes = {
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
  labelTime: PropTypes.string,
  className: PropTypes.string,
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
  className: '',
};

export default addField(DateInputComponent);
