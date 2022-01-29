import { useEffect, useState } from 'react';

import { fetchChecks, submitCheckResults } from '../../services/api';
import { ICheckItem } from '../../services/interfaces';
import {
  isCheckFormSubmitAllowed,
  createDisabledChecksMap,
  resetAnswersAhead,
  compareCheckByPriority,
} from '../../domain/checklist';
import { AnswersMap, AnswerValue, DisabledChecksMap } from '../../domain/interfaces';
import { KeyboardActionType, useKeyboardActions } from './useKeyboardActions';

export function useCheckListState() {
  const [checks, setChecks] = useState<ICheckItem[]>([]);
  const [answersMap, setAnswerMap] = useState<AnswersMap>({});
  const [disabledChecksMap, setDisabledChecksMap] = useState<DisabledChecksMap>({});
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeCheckItem, setActiveCheckItem] = useState<ICheckItem>();
  useKeyboardActions(handleKeyboardActions);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDisabledSubmit(!isCheckFormSubmitAllowed(answersMap, checks));
    setDisabledChecksMap(createDisabledChecksMap(answersMap, checks));
  }, [answersMap, checks]);

  function fetchData() {
    setLoading(true);
    setError(false);
    fetchChecks()
      .then((checksResponse) => {
        const orderedChecks = checksResponse.sort(compareCheckByPriority);
        setChecks(orderedChecks);
      })
      .catch(() => {
        setError(true);
        setChecks([]);
      })
      .finally(() => setLoading(false));
  }

  function handleSubmitCheck() {
    setSubmitting(true);
    submitCheckResults(
      Object.keys(answersMap).map((key) => {
        return {
          checkId: key,
          result: answersMap[key],
        };
      })
    )
      .then(() => {
        setSubmitError(false);
        setFormSubmitted(true);
      })
      .catch(() => setSubmitError(true))
      .finally(() => setSubmitting(false));
  }

  const handleChangeAnswer = (check: ICheckItem, index: number) => (newValue: AnswerValue) => {
    setAnswerMap((currentAnswerMap) => {
      const answerMapReseted = resetAnswersAhead(currentAnswerMap, checks, index);
      return { ...answerMapReseted, [check.id]: newValue };
    });
  };

  function handleRetry() {
    fetchData();
  }

  function handleCheckListItemFocus(item: ICheckItem) {
    setActiveCheckItem(item);
  }

  function handleKeyboardActions(actionType: KeyboardActionType) {
    const currentCheckIndex = checks.findIndex((check) => check.id === activeCheckItem?.id) || 0;
    const disabledCheck = activeCheckItem ? disabledChecksMap[activeCheckItem.id] : false;
    const shouldCallAction = activeCheckItem && !disabledCheck;

    switch (actionType) {
      case KeyboardActionType.ArrowDown:
        const nextCheckIndex = currentCheckIndex + 1;
        if (nextCheckIndex > checks.length - 1) {
          setActiveCheckItem(checks[0]);
          return;
        }
        setActiveCheckItem(checks[nextCheckIndex]);
        break;
      case KeyboardActionType.ArrowUp:
        const previousCheckIndex = currentCheckIndex - 1;
        if (previousCheckIndex < 0) {
          setActiveCheckItem(checks[checks.length - 1]);
          return;
        }
        setActiveCheckItem(checks[previousCheckIndex]);
        break;
      case KeyboardActionType.Yes:
        shouldCallAction && handleChangeAnswer(activeCheckItem, currentCheckIndex)('yes');
        break;
      case KeyboardActionType.No:
        shouldCallAction && handleChangeAnswer(activeCheckItem, currentCheckIndex)('no');
        break;
    }
  }

  return {
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
  };
}
