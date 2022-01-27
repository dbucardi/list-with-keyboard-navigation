import styled, { css } from 'styled-components';
import { Button } from '../Button';

const sharedCss = css`
  background: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  min-width: 80px;
  &[aria-checked='true'] {
    background: var(--primary-color);
    color: white;
  }
`;

export const StyledLeftButton = styled(Button)`
  ${sharedCss}
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right-width: 1px;
`;

export const StyledRightButton = styled(Button)`
  ${sharedCss}
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 1px;
`;
