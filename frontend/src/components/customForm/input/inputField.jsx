import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ name, label, type = 'text', register, error, helperText, ...rest }) => {
  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      variant="outlined"
      size="small"
      error={Boolean(error)}
      helperText={helperText}
      {...register(name)}
      sx={{
        '& .MuiInputBase-root': { height: 40, fontSize: '0.875rem' },
        '& .MuiInputLabel-root': { fontSize: '0.8rem' },
        '& .MuiFormHelperText-root': { fontSize: '0.7rem' },
      }}
      {...rest}
    />
  );
};

export default InputField;
