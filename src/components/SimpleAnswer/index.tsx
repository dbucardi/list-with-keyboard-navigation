import { AnswerValue } from '../../domain/interfaces';
import { StyledLeftButton, StyledRightButton } from './style';

interface ISimpleAnswerProps {
  onChange: (newValue: AnswerValue) => void;
  value?: string;
  disabled?: boolean;
}

export function SimpleAnswer(props: ISimpleAnswerProps) {
  const { onChange, value, disabled } = props;

  return (
    <div role="radiogroup">
      <StyledLeftButton
        type="button"
        onClick={() => onChange('yes')}
        role="radio"
        aria-checked={value === 'yes'}
        disabled={disabled}
      >
        Yes
      </StyledLeftButton>
      <StyledRightButton
        type="button"
        onClick={() => onChange('no')}
        role="radio"
        aria-checked={value === 'no'}
        disabled={disabled}
      >
        No
      </StyledRightButton>
    </div>
  );
}
