import styled from 'styled-components';

export interface ILabelProps extends React.HTMLProps<HTMLLabelElement> {
  disabled?: boolean;
}

export const StyledLabel = styled.label<ILabelProps>`
  display: block;
  padding-bottom: 5px;
  color: ${({ disabled }: ILabelProps) => (disabled ? 'var(--disabled-color)' : 'inherit')};
`;
