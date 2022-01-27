import { StyledLeftButton, StyledRightButton } from './style';

interface ISimpleAnswerProps {
  onChange: (newValue: string) => void;
  value?: string;
}

export function SimpleAnswer(props: ISimpleAnswerProps) {
  const { onChange, value } = props;

  return (
    <div role="radiogroup">
      <StyledLeftButton onClick={() => onChange('yes')} role="radio" aria-checked={value === 'yes'}>
        Yes
      </StyledLeftButton>
      <StyledRightButton onClick={() => onChange('no')} role="radio" aria-checked={value === 'no'}>
        No
      </StyledRightButton>
    </div>
  );
}
