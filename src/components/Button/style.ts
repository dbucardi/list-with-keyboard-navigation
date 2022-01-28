import styled from 'styled-components';

export const StyledButton = styled.button`
  font-weight: 500;
  line-height: 50px;
  letter-spacing: 0.4px;
  text-align: center;
  user-select: none;
  border: 1px solid transparent;
  background-color: var(--primary-color);
  color: white;

  position: relative;
  height: 50px;
  padding: 0 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:disabled {
    background-color: var(--disabled-background-color);
    color: var(--disabled-color);
    cursor: not-allowed;
  }

  &:enabled:hover,
  &:enabled:focus {
    filter: brightness(110%);
  }
`;
