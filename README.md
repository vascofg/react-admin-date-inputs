# react-admin-date-inputs

\<DateInput>, \<TimeInput> and \<DateTimeInput> components for [React-Admin](https://github.com/marmelab/react-admin).

## Installation

```
npm install react-admin-date-inputs --save
```

## Usage


```jsx
import React from 'react';
import {
    Edit,
    TextInput,
    TabbedForm,
    FormTab,
} from 'react-admin'
import { DateInput, TimeInput, DateTimeInput } from 'aor-datetime-input';

export const NewsEdit = (props) => (
  <Edit title={<NewsTitle />} {...props}>
    <TabbedForm>
      <FormTab>
        <LongTextInput source="title" validate={required} />
        <DateInput source="startDate" label="Start date" options={{ format: 'DD/MM/YYYY' }} />
        <TimeInput source="startTime" label="Start time" options={{ format: 'HH:mm:ss' }} />
        <DateTimeInput source="endDate" label="End time" options={{ format: 'DD/MM/YYYY, HH:mm:ss', ampm: false, clearable: true }} />
      </FormTab>
    </TabbedForm>
  </Edit>
);


```

## Options prop

The options prop is passed down to the pickers. Documentation for these options can be found in the [material-ui-pickers documentation](https://material-ui-pickers.firebaseapp.com/demo/datepicker) for the component you're trying to use.

## Development

You can build sources:

```
npm run build
```

## License

This library is licensed under the [MIT Licence](https://github.com/vascofg/react-admin-date-inputs/blob/master/LICENSE).
