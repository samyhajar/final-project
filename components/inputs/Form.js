import React, { createContext, Component } from 'react';

export const FormCtx = createContext({
  fields: {},
  errors: {},
});

export default class Form extends Component {
  state = {
    fields: {},
    errors: {},
  };

  render() {
    const { fields, errors } = this.state;

    const formCtx = {
      fields,
      errors,
      addField: (data) => {
        this.addField(data);
      },
      setFields: this.setFields,
    };

    return (
      <form action="">
        <FormCtx.Provider value={formCtx}>
          {this.props.children}
        </FormCtx.Provider>
      </form>
    );
  }

  setFields = (event, { id, value }) => {
    if (event) {
      event.persist();
    }

    const { fields } = this.state;
    const field = fields[id];

    this.addField({
      field: {
        ...field,
        // consider value passed as the new value if
        // event is not defined. This will be useful
        // when you want to update a field programmatically.
        value: event ? event.currentTarget.value : value,
      },
    });
  };

  addField({ field }) {
    const { id } = field;

    // Initiate all field values with default empty string.
    field = {
      value: '',
      ...field,
    };

    if (id) {
      this.setState((prevState) => {
        return {
          ...prevState,
          fields: {
            ...prevState.fields,
            [id]: field,
          },
        };
      });

      return;
    }

    throw new Error(`please add 'id' field to the input: ${field}`);
  }
}
