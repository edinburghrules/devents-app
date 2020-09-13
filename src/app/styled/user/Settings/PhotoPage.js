import styled from 'styled-components';
import { Button, Image, Container } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';

export const ImageContainer = styled(Container)`
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

export const CroppingImage = styled(ReactCrop)`
  height: 100%;
  width: 100%;
`;

export const ProfileImage = styled(Image)`
  height: 100%;
  width: 100%;
`;

export const UpdatePhotoBtnContainer = styled.div`
  height: 4rem;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
`;

export const UpdatePhotoBtn = styled(Button)`
  margin-top: 3rem;
  height: 3rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
