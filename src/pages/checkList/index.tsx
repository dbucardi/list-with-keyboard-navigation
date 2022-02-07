import { Button } from '../../components/Button';
import { Label } from '../../components/Label';
import { CheckList, CheckListItem, KeyboardNavigation } from '../../components/CheckList';
import { SimpleAnswer } from '../../components/SimpleAnswer';
import { Spinner } from '../../components/Spinner';
import { MessageContainer, Message } from '../../components/Message';
import { useCheckListState } from './useCheckListState';
import { StyledActionsContainer, StyledContainer } from './style';
import { isAnswerAllowed, isCheckFormSubmitAllowed } from '../../domain/checklist';

export function CheckListPage() {
  const {
    checks,
    answersMap,
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
    handleNextActiveItem,
    handlePreviousActiveItem,
    handleChangeAnswerByKeyboard,
  } = useCheckListState();

  const renderCheckListForm = () => (
    <form onSubmit={handleSubmitCheck}>
      <CheckList data-testid="checklist">
        <KeyboardNavigation
          onNext={handleNextActiveItem}
          onPrevious={handlePreviousActiveItem}
          onChangeAnswer={handleChangeAnswerByKeyboard}
        />
        {checks.map((check, index) => {
          const disabledCheck = !isAnswerAllowed(answersMap, checks, index);

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
              />
            </CheckListItem>
          );
        })}
      </CheckList>
      {submitError ? renderSubmitErrorMessage() : <></>}
      <StyledActionsContainer>
        <Button
          type="submit"
          data-testid="submit-btn"
          disabled={!isCheckFormSubmitAllowed(answersMap, checks) || submitting}
        >
          SUBMIT
        </Button>
      </StyledActionsContainer>
    </form>
  );

  const renderErrorMessage = () => (
    <MessageContainer>
      <Message data-testid="error-fetching-checks-message" messageType="error">
        Ops, somenthing went wrong with our application.
      </Message>
      <StyledActionsContainer>
        <Button type="button" onClick={handleRetry}>
          Retry
        </Button>
      </StyledActionsContainer>
    </MessageContainer>
  );

  const renderSubmitErrorMessage = () => (
    <MessageContainer>
      <Message data-testid="error-submitting-message" messageType="error">
        Error trying to submit the form, please try again.
      </Message>
    </MessageContainer>
  );

  const renderFormSubmittedMessage = () => (
    <MessageContainer>
      <Message data-testid="form-sent-message" messageType="success">
        The form was sent successfully!
      </Message>
    </MessageContainer>
  );

  return (
    <StyledContainer>
      {loading ? <Spinner /> : <></>}
      {checks.length > 0 && !formSubmitted ? renderCheckListForm() : <></>}
      {formSubmitted ? renderFormSubmittedMessage() : <></>}
      {error ? renderErrorMessage() : <></>}
    </StyledContainer>
  );
}
