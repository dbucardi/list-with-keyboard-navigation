import styled from 'styled-components';

export const StyledSpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
`;

export const StyledSpinnerText = styled.div`
  display: flex;
  align-items: center;
  font-family: var(--header-font-family);
  font-size: 20px;
  font-weight: 500;
  padding-left: 15px;
`;

export const StyledSpinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;

  &:after {
    content: ' ';
    display: block;
    width: 32px;
    height: 32px;
    margin: 4px;
    border-radius: 50%;
    border: 3px solid var(--primary-color);
    border-color: var(--primary-color) transparent var(--primary-color) transparent;
    animation: spinner-animation 1.2s linear infinite;
  }

  @keyframes spinner-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
