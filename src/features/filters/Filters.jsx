import React from 'react';
import { withFormik, Field } from 'formik';
import SearchTextInput from '../../app/form-inputs/SearchTextInput';

class Filters extends React.Component {
  render() {
    return (
      <div> 
        <Field as={SearchTextInput} name='searchText' placeholder='Find your next event' />
      </div> 
    )
  }
}

const eventFilters = withFormik({
  mapPropsToValues: (props) => {
    return {
      searchText: ''
    }
  }
})(Filters)

export default eventFilters;