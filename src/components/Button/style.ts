import styled from 'styled-components';

export const StyledButton = styled.button`
  font-weight: 500;
  font-size: 14px;
  line-height: 40px;
  letter-spacing: 0.4px;
  text-align: center;
  user-select: none;
  border: 1px solid transparent;
  background-color: var(--primary-color);
  color: white;

  position: relative;
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #e6ebf4;
    color: #bdc0cf;
    cursor: not-allowed;
  }

  &:enabled:hover,
  &:enabled:focus {
    filter: brightness(110%);
  }
`;
