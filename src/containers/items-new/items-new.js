import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createItem } from '../../actions/index';

class ItemsNew extends Component {
  renderField(field) {
    const { meta: { touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createItem(values, () => {
      this.props.history.push('/items');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='Name for item'
          name='name'
          component={this.renderField} />

        <Field
          label='Price'
          name='price'
          component={this.renderField} />

        <Field
          label='Price 1'
          name='price1'
          component={this.renderField} />

        <Field
          label='Price 2'
          name='price2'
          component={this.renderField} />

        <Field
          label='Price 3'
          name='price 3'
          component={this.renderField} />

        <Field
          label='Price 4'
          name='price4'
          component={this.renderField} />

        <Field
          label='Provider'
          name='provider'
          component={this.renderField} />

        <Field
          label='Quantity'
          name='quantify'
          component={this.renderField} />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/items' className='btn btn-danger'>Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // validate the inputs from 'values'
  if (!values.name) {
    errors.name = 'Enter a name';
  }

  // If erros is empty, the form is fine to submit
  // If erros has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'ItemsNewForm'
})(connect(null, { createItem })(ItemsNew));
