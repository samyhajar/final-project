import React, { useContext, useEffect } from 'react';
import { FormCtx } from './Form';

const Input = (props) => {
  const { id } = props;
  const { fields, setFields, addField } = useContext(FormCtx);
  const field = fields[id];

  useEffect(() => {
    addField({
      field: props,
      value: '',
    });
  }, []);

  return field ? (
    <div>
      <input
        type="text"
        value={field && field.value}
        onChange={(event) => setFields(event, field)}
      />
    </div>
  ) : (
    ''
  );
};

export default Input;
