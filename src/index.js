import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FieldTitle, useInput } from 'ra-core';
import {
    DatePicker,
    DateRangeDelimiter,
    DateRangePicker,
    DateTimePicker,
    LocalizationProvider,
    TimePicker
} from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

const Picker = ({ PickerComponent, ...fieldProps }) => {

    const {
        options,
        label,
        labelStart,
        labelEnd,
        source,
        sourceStart,
        sourceEnd,
        resource,
        className,
        isRequired,
        providerOptions,
    } = fieldProps;

    const { input, meta } = useInput({ source });
    const { input: inputStart } = useInput({ source: sourceStart });
    const { input: inputEnd } = useInput({ source: sourceEnd });

    const { touched, error } = meta;

    const handleChange = useCallback(value => {
        if (Array.isArray(value)) {
            if (null !== value[0])
                Date.parse(value[0]) ? inputStart.onChange(value[0].toISOString()) : inputStart.onChange(null);
            if (null !== value[1])
                Date.parse(value[1]) ? inputEnd.onChange(value[1].toISOString()) : inputEnd.onChange(null);
        } else {
            Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
        }
    }, [input, inputStart, inputEnd]);

    return (
        <div className="picker">
            <LocalizationProvider { ...providerOptions }>
                { sourceStart && sourceEnd ?
                    <PickerComponent
                        { ...options }
                        startText={ <FieldTitle
                            label={ labelStart }
                            source={ sourceStart }
                            resource={ resource }
                            isRequired={ isRequired }
                        /> }
                        endText={ <FieldTitle
                            label={ labelEnd }
                            source={ sourceEnd }
                            resource={ resource }
                            isRequired={ isRequired }
                        /> }
                        margin="normal"
                        error={ !!(touched && error) }
                        helperText={ touched && error }
                        className={ className }
                        value={ [inputStart.value ? new Date(inputStart.value) : null, inputEnd.value ? new Date(inputEnd.value) : null] }
                        onChange={ date => handleChange(date) }
                        renderInput={ (startProps, endProps) => (
                            <Fragment>
                                <TextField { ...startProps } />
                                <DateRangeDelimiter> to </DateRangeDelimiter>
                                <TextField { ...endProps } />
                            </Fragment>
                        ) }
                    />
                    :
                    <PickerComponent
                        { ...options }
                        label={ <FieldTitle
                            label={ label }
                            source={ source }
                            resource={ resource }
                            isRequired={ isRequired }
                        /> }
                        margin="normal"
                        error={ !!(touched && error) }
                        helperText={ touched && error }
                        className={ className }
                        value={ input.value ? new Date(input.value) : null }
                        onChange={ date => handleChange(date) }
                        onBlur={ () => input.onBlur(input.value ? new Date(input.value).toISOString() : null) }
                    />
                }
            </LocalizationProvider>
        </div>
    )
}

Picker.propTypes = {
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    sourceStart: PropTypes.string,
    sourceEnd: PropTypes.string,
    labelTime: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        utils: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
    fullWidth: PropTypes.bool
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
        dateAdapter: DateFnsUtils,
        locale: undefined,
    },
    fullWidth: false
};

export const DateInput = props => <Picker PickerComponent={ DatePicker } { ...props } />
export const TimeInput = props => <Picker PickerComponent={ TimePicker } { ...props } />
export const DateTimeInput = props => <Picker PickerComponent={ DateTimePicker } { ...props } />
export const DateRangeInput = props => <Picker PickerComponent={ DateRangePicker } { ...props } />
