import React from 'react';
import styled from 'styled-components';
import { Form, InputGroup } from 'react-bootstrap';

const SearchIcon = styled.img`
  width: 12px;
`;

const SearchTextField = styled(InputGroup)`
margin-right: 1rem;
width: 40rem;
  & > * {
    height: 45px;
  }

  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const SearchTextInput = (props) => {
  return (
    <SearchTextField>
      <InputGroup.Prepend>
        <InputGroup.Text>
          <SearchIcon src='/assets/magnifying-glass.png' />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control {...props} />
    </SearchTextField>
  );
};

export default SearchTextInput;
