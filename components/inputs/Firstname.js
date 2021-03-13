import React, { useContext, useEffect } from 'react';
import { FormCtx } from './Form';

const TextInput = (props) => {
  const { id } = props;
  const { setFields, addField, fields } = useContext(FormCtx);
  const field = fields[id] || {};
  const {
    name,
    rows,
    value,
    validate,
    placeholder,
    label = '',
    type = 'text',
    events = {},
    classes = {},
  } = field;
  const { onChange, ...restEvents } = events;
  const { contClass, fieldClass, errorClass } = classes;

  const handleChange = (event) => {
    setFields(event, field);

    if (typeof onChange === 'function') {
      onChange({
        ...field,
        value: event.target.value,
      });
    }
  };

  useEffect(() => {
    addField({
      field: props,
      value,
    });
  }, []);

  const fieldProps = {
    ...restEvents,
    id,
    name,
    type,
    value,
    validate,
    placeholder,
    className: fieldClass,
    onChange: handleChange,
  };

  if (type === 'textarea') {
    delete fieldProps.type;
    delete fieldProps.value;

    fieldProps.defaultValue = value;
    fieldProps.rows = rows || 2;
  }

  return field ? (
    <div className={contClass}>
      {label}
      {type === 'textarea' ? (
        <textarea {...fieldProps} />
      ) : (
        <input {...fieldProps} />
      )}
      <p className={errorClass}>// place for errors</p>
    </div>
  ) : (
    ''
  );
};

export default TextInput;
