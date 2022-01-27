import {
  StyledSpinner,
  StyledSpinnerContainer,
  StyledSpinnerText,
} from "./style";

export function Spinner() {
  return (
    <StyledSpinnerContainer>
      <StyledSpinner />
      <StyledSpinnerText>Loading...</StyledSpinnerText>
    </StyledSpinnerContainer>
  );
}
