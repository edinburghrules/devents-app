import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Container,
} from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


const ImageContainer = styled(Container)`
  background: #fff;
  max-height: 20rem;
  width: 30%;
  margin: 2rem 0 2rem 0;
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid #eee;
`;

const EventPhotoLabel = styled.p`
  font-weight: 600;
  font-size: .8rem;
  color: #222;
  margin-bottom: .5rem;
`;

const CroppingImage = styled(ReactCrop)`
  height: 100%;
  width: 100%;
`;

const UpdatePhotoBtnContainer = styled.div`
  height: 4rem;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
`;

const CancelPhotoBtn = styled(Button)`
  margin-top: 0.5rem;
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
      aspect: 16 / 9,
    },
  };

  componentDidMount = () => {
    console.log('Component Mounted', this.props.field.value);
    if(JSON.stringify(this.props.value) !== '') {
      this.setState(prevState => ({
        src: this.props.field.value.src,
        filename: this.props.field.value.filename
      }))
    }
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({ src: reader.result })
      });
      reader.readAsDataURL(e.target.files[0]);
      this.setState({
        filename: e.target.files[0].name,
      });
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = async (crop) => {
    await this.makeClientCrop(crop);
    this.props.form.setFieldValue(this.props.field.name, { blob: this.state.blob, src: this.state.src});
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
        }
    })
  }

  render() {
    const { crop, src } = this.state;
    return (
      <div>
      <EventPhotoLabel>Event photo</EventPhotoLabel>
        <InputGroup className='custom-file'>
          <FormControl
            as='input'
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={this.onSelectFile}
          />
          <Form.Label className='custom-file-label' htmlFor='customFile'>
            {this.state.filename ? this.state.filename : 'Choose file'}
          </Form.Label>
        </InputGroup>
        {src && (
          <React.Fragment>
            <ImageContainer>
                <CroppingImage
                  src={src}
                  crop={crop}
                  ruleOfThirds
                  maxWidth='500'
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
            </ImageContainer>
            <UpdatePhotoBtnContainer>
            <CancelPhotoBtn onClick={this.cancelPhoto}>
              Remove
            </CancelPhotoBtn>
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
