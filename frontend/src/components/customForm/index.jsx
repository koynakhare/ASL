import React from 'react';
import { Grid } from '@mui/material';
import InputField from './InputField';

const renderField = (field, register, errors) => {
  const { name, label, type = 'text' } = field;
  const error = errors?.[name];
  const helperText = error?.message;

  switch (type) {
    case 'text':
    case 'email':
    case 'number':
    case 'password':
      return (
        <InputField
          key={name}
          name={name}
          label={label}
          type={type}
          register={register}
          error={error}
          helperText={helperText}
        />
      );

    default:
      return null;
  }
};

const DynamicFormInput = ({ fields = [], register, errors = {} }) => {
  return (
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid item xs={12} sm={6} key={field.name}>
          {renderField(field, register, errors)}
        </Grid>
      ))}
    </Grid>
  );
};

export default DynamicFormInput;
