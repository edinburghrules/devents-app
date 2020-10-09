import React from 'react';
import styled from 'styled-components';
import { Form, InputGroup } from 'react-bootstrap';

const SearchTextCard = styled.div`
  box-shadow: 0 4px 2px -2px #e0e0e0;
  background: #fff;
  margin: -4.5rem 0 5rem 0;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 15px;
`;

const SearchTextContainer = styled(Form.Group)`
  margin: 0;
  width: 100%;
`;

const SearchTextField = styled(InputGroup)`
  width: 100%;
  & > * {
    height: 50px;
  }
`;


const SearchTextInput = (props) => {
  const handleChange = (e) => {
    props.getSearchTerm(e.target.value);
  }
  
  return (
    <SearchTextCard >
      <SearchTextContainer onChange={handleChange}>
        <SearchTextField>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <SearchIcon src='/assets/magnifying-glass.png'/>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control/>
        </SearchTextField>
      </SearchTextContainer>
    </SearchTextCard>
  );
};

export default SearchTextInput;
