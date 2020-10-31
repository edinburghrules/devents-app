import React from 'react';
import styled from 'styled-components';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form } from 'react-bootstrap';

const FormContainer = styled(Form.Group)`
  position: relative;
`;

const FormLabel = styled(Form.Label)`
  font-size: 0.8rem;
  font-weight: 600;
  color: #222;
`;

const AutocompleteDropdownContainer = styled.div`
  position: absolute;
  z-index: 1000;
  top: 4.5rem;
  left:  0;
  text-align: left;
  overflow: hidden;
  width: 100%;
`;

const Loading = styled.div`
  background: #ffffff;
`;

class PlaceInput extends React.Component {
  handleChange = (value) => {
    const {
      field: { name },
      form: { setFieldValue },
      getCoords,
    } = this.props;
    if (name === 'city') {
      setFieldValue(name, value);
      getCoords(name, value);
    } else if (name === 'homeCity') {
      setFieldValue(name, value);
    } else {
      setFieldValue(name, value);
      getCoords(name, value);
    }
  };

  render() {
    const {
      field: { name, value },
      form: { setFieldTouched },
    } = this.props;
    return (
      <PlacesAutocomplete
        {...this.props}
        value={value}
        onChange={this.handleChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <FormContainer>
            <FormLabel>
              {name === 'homeCity' ? 'Hometown' : `Event ${name}`}
            </FormLabel>
            <Form.Control
              {...getInputProps({
                placeholder: 'Enter event city or town',
                className: 'location-search-input',
              })}
              onBlur={(e) => {
                setFieldTouched(name, 'true');
              }}
            />
            <AutocompleteDropdownContainer>
              {loading && <div>Loading...</div>}
              {suggestions.length > 0 &&
                suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: '#f5f5f5',
                        cursor: 'pointer',
                        padding: '1rem',

                      }
                    : {
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        padding: '1rem',
                      };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={index}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
            </AutocompleteDropdownContainer>
          </FormContainer>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default PlaceInput;
