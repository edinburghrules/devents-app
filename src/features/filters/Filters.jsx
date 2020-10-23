import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withFormik, Field } from 'formik';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { getEvents } from '../../app/redux/actions/eventActions';
import SearchTextInput from '../../app/form-inputs/SearchTextInput';
import SearchAreaInput from '../../app/form-inputs/SearchAreaInput';

const SearchFiltersCard = styled.div`
  box-shadow: 0 4px 2px -2px #e0e0e0;
  background: #fff;
  margin: 8rem 12rem 2rem 12rem;
  padding: 30px;
  border-radius: 8px;
`;

const SearchFiltersContainer = styled(Form.Group)`
  margin: 0;
  width: 100%;
`;

const SearchFiltersForm = styled(Form)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SearchFiltersInputs = styled.div`
  width: 80%;
  display: flex;
`;

const SearchButton = styled(Button)`
  width: 6rem;
  height: 50px;
  background: #FF6F61 !important;
  border-color: #fff !important;
`;

let searchCoords = {
  latitude: null,
  longitude: null
};

class Filters extends React.Component {
getCoords = async (city) => {
  try {
    const geoCodeFetch = await geocodeByAddress(city);
    const results = await getLatLng(geoCodeFetch[0]);
    searchCoords.latitude = results.lat;
    searchCoords.longitude = results.lng;
  } catch (err) {
    console.log(err);
  }
};
  render() {
    const { handleSubmit, values } = this.props;
    console.log(searchCoords);
    return (
      <SearchFiltersCard>
        <SearchFiltersContainer>
          <SearchFiltersForm onSubmit={handleSubmit}>
            <SearchFiltersInputs>
              <Field
                as={SearchTextInput}
                name='searchEvents'
                placeholder='Find your next event'
              />
              <Field getCoords={this.getCoords} component={SearchAreaInput} name='searchArea' searchOptions={{ types: ['(cities)'] }}/>
            </SearchFiltersInputs>
            <SearchButton type='submit'>Search</SearchButton>
          </SearchFiltersForm>
        </SearchFiltersContainer>
      </SearchFiltersCard>
    );
  }
}

const eventFilters = withFormik({
  mapPropsToValues: (props) => {
    return {
      searchEvents: '',
      searchArea: '',
    };
  },
  handleSubmit: async (values, formikBag) => {
    await formikBag.props.getEvents(searchCoords);
    formikBag.props.history.push(`/search-results/${values.searchEvents}`)
    // TODO
    // Run validation with Yup
    // On submit, show loader => fire getEvents dispatch with location co-ordinates
    // Once events have been filter them based on search text
    // Render results page
  },
})(Filters);

const mapDispatchToProps = {
  getEvents
};

export default connect(null, mapDispatchToProps)(withRouter(eventFilters));
