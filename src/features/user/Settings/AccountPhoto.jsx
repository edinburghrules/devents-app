import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  InputGroup,
  FormControl,
  Form,
  Spinner,
  Button,
  Image,
  Container,
} from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { handlePhotoUpload } from '../../../app/redux/actions/userActions';
import {
  startUpLoading,
  stopUpLoading,
} from '../../../app/redux/actions/asyncActions';

const ImageContainer = styled(Container)`
  background: #fff;
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 8px;
  margin: 5rem auto;
  border: 2px solid #eee;
`;

const CroppingImage = styled(ReactCrop)`
  height: 100%;
  width: 100%;
`;

const ProfileImage = styled(Image)`
  height: 100%;
  width: 100%;
`;

const UpdatePhotoBtnContainer = styled.div`
  height: 4rem;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
`;

const UpdatePhotoBtn = styled(Button)`
  margin-top: 3rem;
  height: 3rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpLoading = styled.div`
  height: 250px;
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
      width: 30,
      aspect: 1,
    },
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
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

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
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
        'newFile.jpeg'
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

  handleClick = async () => {
    this.props.startUpLoading();
    try {
      await this.props.handlePhotoUpload(this.state.blob);
      this.setState((prevState) => ({
        ...prevState,
        src: null,
        filename: null,
      }));
      this.props.stopUpLoading();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { crop, src } = this.state;
    const { profilePhoto, upLoading } = this.props;
    return (
      <div>
        {src && (
          <React.Fragment>
            <h4>Profile Photo</h4>
            <ImageContainer>
              {upLoading ? (
                <UpLoading>
                  <Spinner
                    as='span'
                    animation='border'
                    role='status'
                    aria-hidden='true'
                    variant='primary'
                  />
                </UpLoading>
              ) : (
                <CroppingImage
                  src={src}
                  crop={crop}
                  ruleOfThirds
                  maxWidth='250'
                  maxHeight='250'
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
              )}
            </ImageContainer>
          </React.Fragment>
        )}
        {src === null && (
          <React.Fragment>
            <h4>Profile Photo</h4>
            <ImageContainer>
              <ProfileImage src={profilePhoto || '/assets/profile.png'} fluid />
            </ImageContainer>
          </React.Fragment>
        )}
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
          <UpdatePhotoBtnContainer>
            <UpdatePhotoBtn onClick={this.handleClick}>
              {upLoading ? (
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              ) : (
                'Upload'
              )}
            </UpdatePhotoBtn>
          </UpdatePhotoBtnContainer>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  upLoading: state.async.upLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handlePhotoUpload: (file) => {
      return dispatch(handlePhotoUpload(file));
    },
    startUpLoading: () => {
      dispatch(startUpLoading());
    },
    stopUpLoading: () => {
      dispatch(stopUpLoading());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPage);
