import { useEffect, useState } from 'react';

import { fetchChecks, submitCheckResults } from '../../services/api';
import { ICheckItem } from '../../services/interfaces';
import {
  resetAllAnswersBellowIndex,
  compareCheckByPriority,
  getNextCheckItemIndex,
  getPreviousCheckItemIndex,
  isAnswerAllowed,
} from '../../domain/checklist';
import { AnswersMap, AnswerValue } from '../../domain/interfaces';

export function useCheckListState() {
  const [checks, setChecks] = useState<ICheckItem[]>([]);
  const [answersMap, setAnswerMap] = useState<AnswersMap>({});
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeCheckItem, setActiveCheckItem] = useState<ICheckItem>();

  useEffect(() => {
    fetchData();
  }, []);

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

  function getActiveCheckItemIndex() {
    return checks.findIndex((check) => check.id === activeCheckItem?.id) || 0;
  }

  function handleSubmitCheck(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      const answerMapReseted = resetAllAnswersBellowIndex(currentAnswerMap, checks, index);
      return { ...answerMapReseted, [check.id]: newValue };
    });
  };

  function handleRetry() {
    fetchData();
  }

  function handleCheckListItemFocus(item: ICheckItem) {
    setActiveCheckItem(item);
  }

  function handleNextActiveItem() {
    const activeCheckItemIndex = getActiveCheckItemIndex();
    const nextCheckIndex = getNextCheckItemIndex(activeCheckItemIndex, checks.length);
    setActiveCheckItem(checks[nextCheckIndex]);
  }

  function handlePreviousActiveItem() {
    const activeCheckItemIndex = getActiveCheckItemIndex();
    const nextCheckIndex = getPreviousCheckItemIndex(activeCheckItemIndex, checks.length);
    setActiveCheckItem(checks[nextCheckIndex]);
  }

  function handleChangeAnswerByKeyboard(answer: AnswerValue) {
    const activeCheckItemIndex = getActiveCheckItemIndex();
    const shouldCallChangeAnswer = activeCheckItem && isAnswerAllowed(answersMap, checks, activeCheckItemIndex);
    shouldCallChangeAnswer && handleChangeAnswer(activeCheckItem, activeCheckItemIndex)(answer);
  }

  return {
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
  };
}
