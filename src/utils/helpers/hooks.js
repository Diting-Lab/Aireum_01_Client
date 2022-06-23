/* This hook takes care of:
- Managing all states for a Form
- Developer can initial any states
- Provides Change handler to update the states
- Provides OnSubmit callback that the developer can provide
*/
import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    setValues,
  };
};
