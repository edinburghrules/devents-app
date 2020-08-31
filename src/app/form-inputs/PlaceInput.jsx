import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form } from 'react-bootstrap';

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
          <Form.Group>
            <Form.Label>
              {name === 'homeCity' ? 'Hometown' : `Event ${name}`}
            </Form.Label>
            <Form.Control
              {...getInputProps({
                placeholder: 'Enter event city or town',
                className: 'location-search-input',
              })}
              onBlur={(e) => {
                setFieldTouched(name, 'true');
              }}
            />
            <div className='autocomplete-dropdown-container'>
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
            </div>
          </Form.Group>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default PlaceInput;
