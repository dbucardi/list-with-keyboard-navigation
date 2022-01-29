import { Button } from '../../components/Button';
import { Label } from '../../components/Label';
import { CheckList, CheckListItem } from '../../components/CheckList';
import { SimpleAnswer } from '../../components/SimpleAnswer';
import { Spinner } from '../../components/Spinner';
import { useCheckListState } from './useCheckListState';

import { StyledActionsContainer, StyledContainer, StyledMessageContainer, StyledErrorMessage } from './style';

export function CheckListPage() {
  const {
    checks,
    answersMap,
    disabledChecksMap,
    disabledSubmit,
    error,
    submitError,
    loading,
    submitting,
    formSubmitted,
    activeCheckItem,
    handleSubmitCheck,
    handleChangeAnswer,
    handleRetry,
    handleCheckListItemFocus,
  } = useCheckListState();

  const renderCheckListForm = () => (
    <>
      <CheckList data-testid="checklist">
        {checks.map((check, index) => {
          const disabledCheck = disabledChecksMap[check.id];

          return (
            <CheckListItem
              key={check.id}
              data-testid={`check-list-item[${index}]`}
              active={activeCheckItem?.id === check.id}
              disabled={disabledCheck}
              onFocus={() => handleCheckListItemFocus(check)}
            >
              <Label disabled={disabledCheck} data-testid={`check-list-label[${index}]`}>
                {check.description}
              </Label>
              <SimpleAnswer
                onChange={handleChangeAnswer(check, index)}
                value={answersMap[check.id]}
                disabled={disabledCheck}
                data-testid={`simple-answer[${index}]`}
              />
            </CheckListItem>
          );
        })}
      </CheckList>
      {submitError ? renderSubmitErrorMessage() : <></>}
      <StyledActionsContainer>
        <Button onClick={handleSubmitCheck} disabled={disabledSubmit || submitting}>
          SUBMIT
        </Button>
      </StyledActionsContainer>
    </>
  );

  const renderErrorMessage = () => (
    <StyledMessageContainer>
      <StyledErrorMessage data-testid="error-fetching-checks-message">
        Ops, somenthing went wrong with our application.
      </StyledErrorMessage>
      <StyledActionsContainer>
        <Button onClick={handleRetry}>Retry</Button>
      </StyledActionsContainer>
    </StyledMessageContainer>
  );

  const renderSubmitErrorMessage = () => (
    <StyledMessageContainer>
      <StyledErrorMessage data-testid="error-submitting-message">
        Error trying to submit the form, please try again.
      </StyledErrorMessage>
    </StyledMessageContainer>
  );

  const renderFormSubmitedMessage = () => (
    <StyledMessageContainer data-testid="form-sent-message">The form was sent successfully!</StyledMessageContainer>
  );

  return (
    <StyledContainer>
      {loading ? <Spinner data-testid="spinner" /> : <></>}
      {checks.length > 0 && !formSubmitted ? renderCheckListForm() : <></>}
      {formSubmitted ? renderFormSubmitedMessage() : <></>}
      {error ? renderErrorMessage() : <></>}
    </StyledContainer>
  );
}
