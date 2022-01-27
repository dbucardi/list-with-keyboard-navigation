import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Label } from '../../components/Label';
import { CheckList, CheckListItem } from '../../components/CheckList';
import { SimpleAnswer } from '../../components/SimpleAnswer';
import { Spinner } from '../../components/Spinner';
import { fetchChecks } from '../../services/api';
import { ICheckItem } from '../../services/interfaces';
import { StyledActionsContainer, StyledContainer } from './style';

export default function CheckListPage() {
  const [checks, setChecks] = useState<ICheckItem[]>([]);
  const [answersMap, setAnswerMap] = useState<{ [key: string]: string }>({});
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError(false);
    fetchChecks()
      .then((checksResponse) => {
        setChecks(checksResponse);
      })
      .catch(() => {
        setError(true);
        setChecks([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const hasNoResponse = Object.keys(answersMap).some((key) => answersMap[key] === 'no');
    const answeredAllQuestions = Object.keys(answersMap).length === checks.length;
    const allYesAnswers = answeredAllQuestions && Object.keys(answersMap).every((key) => answersMap[key] === 'yes');
    if (allYesAnswers || hasNoResponse) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [answersMap, checks]);

  const handleChangeAnswer = (check: ICheckItem) => (newValue: string) => {
    setAnswerMap((currentAnswerMap) => {
      const newAnswerMap = { ...currentAnswerMap, [check.id]: newValue };
      return newAnswerMap;
    });
  };

  const handleRetry = () => {
    fetchData();
  };

  return (
    <StyledContainer>
      {loading ? <Spinner /> : <></>}
      {checks.length > 0 ? (
        <>
          <CheckList>
            {checks.map((check) => (
              <CheckListItem key={check.id}>
                <Label>{check.description}</Label>
                <SimpleAnswer onChange={handleChangeAnswer(check)} value={answersMap[check.id]} />
              </CheckListItem>
            ))}
          </CheckList>
          <StyledActionsContainer>
            <Button disabled={disableSubmit}>SUBMIT</Button>
          </StyledActionsContainer>
        </>
      ) : (
        <></>
      )}

      {error ? (
        <span>
          Ops, somenthing went wrong with our application, try to refresh the page.
          <Button onClick={handleRetry}>Retry</Button>
        </span>
      ) : (
        <></>
      )}
    </StyledContainer>
  );
}
