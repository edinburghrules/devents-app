import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Image,
  InputGroup,
  FormControl,
  Form,
  Jumbotron,
  Spinner,
} from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { handlePhotoUpload } from '../../../app/redux/actions/profileActions';
import {
  startLoading,
  stopLoading,
} from '../../../app/redux/actions/asyncActions';

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
    this.props.startLoading();
    try {
      await this.props.handlePhotoUpload(this.state.blob);
      this.setState((prevState) => ({
        ...prevState,
        src: null,
        filename: null,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { crop, src } = this.state;
    const {profilePhoto} = this.props;
    return (
      <div className='App'>
        {src && (
          <ReactCrop
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
        {src === null && (<Jumbotron flex>
          <h4>Profile photo</h4>
          <Image src={profilePhoto || '/assets/profile.png'} fluid />
        </Jumbotron>)}
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
          <Button onClick={this.handleClick}>
            {this.props.loading ? (
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
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.async.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handlePhotoUpload: (file) => {
      return dispatch(handlePhotoUpload(file));
    },
    startLoading: () => {
      dispatch(startLoading());
    },
    stopLoading: () => {
      dispatch(stopLoading());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPage);
