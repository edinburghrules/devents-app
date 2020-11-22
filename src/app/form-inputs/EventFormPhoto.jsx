import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageContainer = styled.div`
  background: #fff;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
`;

const EventPhotoLabel = styled.p`
  font-weight: 600;
  font-size: 0.8rem;
  color: #222;
  margin-bottom: 0.5rem;
`;

const CroppingImage = styled(ReactCrop)`
  max-width: 100%;
`;

const UpdatePhotoBtnContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
`;

const CancelPhotoBtn = styled(Button)`
  margin-top: 1rem;
  height: 3rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class PhotoPage extends React.Component {
  state = {
    filename: null,
    src: null,
    crop: {
      unit: '%',
      width: 100,
      height: 100,
    },
  };

  // if editing event and photo already exists in event obj.
  componentDidMount = () => {
    if (JSON.stringify(this.props.value) !== '') {
      this.setState({
        src: this.props.field.value.src,
        filename: this.props.field.value.filename,
      });
    }
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({ src: reader.result });
      });
      reader.readAsDataURL(e.target.files[0]);
      this.setState({
        filename: e.target.files[0].name,
      });
    }
  };

  onImageLoaded = async (image) => {
    this.imageRef = image;
    if (this.imageRef) {
      const imageUrl = await this.getCroppedImg(
        this.imageRef,
        this.state.crop,
        this.state.filename
      );
      this.setState({ imageUrl });
      this.props.form.setFieldValue(this.props.field.name, {
        blob: this.state.blob,
        src: this.state.src,
        filename: this.state.filename,
      });
    }
  };

  onCropComplete = async (crop) => {
    await this.makeClientCrop(crop);
    this.props.form.setFieldValue(this.props.field.name, {
      blob: this.state.blob,
      src: this.state.src,
      filename: this.state.filename,
    });
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        this.state.filename
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
        this.setState({ blob: blob });
      }, 'image/jpeg');
    });
  }

  cancelPhoto = () => {
    this.setState({
      filename: null,
      src: null,
      crop: {
        aspect: 16 / 9,
      },
    });
  };

  render() {
    const { crop, src } = this.state;
    const { field } = this.props;

    return (
      <div>
        <EventPhotoLabel>Event photo</EventPhotoLabel>
        <InputGroup className='custom-file' style={{zIndex: '-1'}}>
          <FormControl
            as='input'
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={this.onSelectFile}
          />
          <Form.Label className='custom-file-label' htmlFor='customFile'>
            {this.state.filename
              ? this.state.filename
              : field.value.filename
              ? field.value.filename
              : 'Choose file'}
          </Form.Label>
        </InputGroup>
        {src && (
          <React.Fragment>
            <ImageContainer>
              <CroppingImage
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            </ImageContainer>
            <UpdatePhotoBtnContainer>
              <CancelPhotoBtn onClick={this.cancelPhoto}>Remove</CancelPhotoBtn>
            </UpdatePhotoBtnContainer>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  upLoading: state.async.upLoading,
});

export default connect(mapStateToProps)(PhotoPage);
