import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FieldTitle, useInput, useTranslate } from 'ra-core';
import { LocalizationProvider } from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

const Picker = ({ Component, ...props }) => {
    const {
        options,
        label,
        source,
        resource,
        className,
        isRequired,
        providerOptions,
        fullWidth,
        onChange
    } = props;

    const translate = useTranslate();
    const { input, meta } = useInput({ source });
    const { touched, error } = meta;

    const handleChange = useCallback(value => {
        onChange(value)

        Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
    }, [input]);

    return (
        <div className="picker">
            <LocalizationProvider { ...providerOptions }>
                <Component
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
                    clearLabel={ translate('ra.action.clear_input_value') }
                    cancelLabel={ translate('ra.action.cancel') }
                    onChange={ date => handleChange(date) }
                    onBlur={ () => input.onBlur(input.value ? new Date(input.value).toISOString() : null) }
                    renderInput={ props =>
                        <TextField { ...props }
                                   margin="normal"
                                   variant="filled"
                                   fullWidth={ fullWidth }/>
                    }
                />
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
    labelTime: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        dateAdapter: PropTypes.func,
        dateLibInstance: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
    fullWidth: PropTypes.bool,
    onChange: PropTypes.func
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
    fullWidth: false,
    onChange: () => {
    }
};

export default Picker