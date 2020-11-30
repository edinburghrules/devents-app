import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import {Form} from 'react-bootstrap';

import 'react-quill/dist/quill.snow.css';

const FormLabel = styled(Form.Label)`
  font-size: 0.8rem;
  font-weight: 600;
  color: #222;
`;

class RichText extends React.Component {

  modules = {
    toolbar: [
      [{ 'header': [ 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}]
    ],
  }

  handleChange = (text) => {
    this.props.form.setFieldValue(this.props.field.name, text)
  }

  render() {
    const {field} = this.props;
    return (
      <Form.Group>
      <FormLabel>{field.name === 'about' ? 'About' : 'Event description'}</FormLabel>
        <ReactQuill modules={this.modules} theme={'snow'} value={field.value} onChange={this.handleChange} {...this.props} />
      </Form.Group>
    )
  }
}

export default RichText;
