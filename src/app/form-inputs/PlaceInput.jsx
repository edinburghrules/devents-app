import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form } from 'react-bootstrap';

const PlaceInput = (props) => {
  const {
    field: { name },
    form: { setFieldValue },
    getCoords,
  } = props;

  const handleChange = (value) => {
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

  return (
    <PlacesAutocomplete
      {...props}
      value={props.field.value}
      onChange={handleChange}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Form.Group>
          <Form.Label>
            {name === 'homeCity' ? 'Hometown' : `Event ${name}`}
          </Form.Label>
          <Form.Control
            {...getInputProps({
              placeholder: 'Enter event city or town',
              className: 'location-search-input',
            })}
          />
          <div className='autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}
            {suggestions.length > 0 && suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? {
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                    padding: '1rem',
                    transition: '0.2s',
                  }
                : {
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    padding: '0.9rem',
                    transition: '0.2s',
                  };
              return (
                <div
                  key={index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </Form.Group>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceInput;
