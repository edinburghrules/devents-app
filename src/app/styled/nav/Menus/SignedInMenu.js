import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const activeClassName = 'nav-item-active'

export const NaviLink = styled(NavLink).attrs({ activeClassName })`
  color: #333;
  font-weight: 400;
  font-size: .9rem;
  padding: 0 .5rem;
  &:hover {
    text-decoration: none;
    color: #98b5ff;
  }
  &.${activeClassName} {
    color: #98b5ff;
  }
`;

export const NavAvatar = styled(Image)`
  height: 30px;
  width: 30px;
`;

export const NavDropdownLink = styled(NavLink)`
  font-size: 0.8rem;
`;
