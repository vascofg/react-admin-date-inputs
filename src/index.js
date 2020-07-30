import React from 'react';
import { DatePicker, DateRangePicker, DateTimePicker, TimePicker } from '@material-ui/pickers';
import RangePicker from './RangePicker';
import Picker from './Picker';

export const DateInput = props => <Picker PickerComponent={ DatePicker } { ...props } />
export const TimeInput = props => <Picker PickerComponent={ TimePicker } { ...props } />
export const DateTimeInput = props => <Picker PickerComponent={ DateTimePicker } { ...props } />
export const DateRangeInput = props => <RangePicker PickerComponent={ DateRangePicker } { ...props } />
