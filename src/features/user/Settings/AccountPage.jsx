import React from 'react';
import { Alert, Container, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/form-inputs/TextInput';

const AccountPage = ({ handleSubmit, errors, touched }) => {
  console.log(errors);
  return (
    <div>
      <h2>Account Page</h2>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Field name='newpassword' as={TextInput} type='password' />
          {touched.newpassword && errors.hasOwnProperty('newpassword') && (
            <Alert variant='danger'>{errors.newpassword}</Alert>
          )}
          <Field name='confirmpassword' as={TextInput} type='password' />
          {touched.confirmpassword && errors.hasOwnProperty('confirmpassword') && (
            <Alert variant='danger'>{errors.confirmpassword}</Alert>
          )}
          {errors.hasOwnProperty('error') && (
            <Alert variant='danger'>{errors.error}</Alert>
          )}
          <Button type='submit'>Update password</Button>
        </Form>
      </Container>
    </div>
  );
};

const formikAccountPage = withFormik({
  mapPropsToValues: () => ({
    newpassword: '',
    confirmpassword: '',
  }),
  validationSchema: Yup.object().shape({
    newpassword: Yup.string().required('Please provide a new password'),
    confirmpassword: Yup.string().required('Please confirm your new password'),
  }),
  handleSubmit: (values, {setErrors}) => {
    if(values.newpassword === values.confirmpassword) {
      console.log('They match!');
    } else {
      setErrors({error: 'Passwords do not match!'})
    }
  },
})(AccountPage);

export default connect()(formikAccountPage);
