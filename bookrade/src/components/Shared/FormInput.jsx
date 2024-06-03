import React from 'react';
import TextField from '@mui/material/TextField';

const FormInput = (props) => {
  return (
    <TextField
      id="outlined-basic"
      label={props.name}
      variant="outlined"
      className='form_input'
      InputLabelProps={{
        style: { fontSize: '1.7rem', marginRight: '100px' }
      }}
    />
  );
};

export default FormInput;
