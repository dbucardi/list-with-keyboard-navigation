import { ICheckItem } from '../services/interfaces';
import { AnswersMap } from './interfaces';

/**
 * This method is responsible for check if form submit is allowed.
 * @param answersMap key value object where key is the check id and the value is the answer.
 * @param checks the checks sorted by priority.
 * @returns true if the form submit is allowed and false if it is not allowed.
 */
export function isCheckFormSubmitAllowed(answersMap: AnswersMap, checks: ICheckItem[]): boolean {
  const hasNoResponse = Object.keys(answersMap).some((key) => answersMap[key] === 'no');
  const answeredAllChecks = Object.keys(answersMap).length === checks.length;
  const allYesAnswers = answeredAllChecks && Object.keys(answersMap).every((key) => answersMap[key] === 'yes');
  if (allYesAnswers || hasNoResponse) {
    return true;
  }
  return false;
}

/**
 * This method checks if the check answer is allowed based on the answers and the current check index.
 * @param answersMap key value object where key is the check id and the value is the answer.
 * @param checks the checks sorted by priority.
 * @param index the current check index.
 * @returns true if the answer is allowed.
 */
export function isAnswerAllowed(answersMap: AnswersMap, checks: ICheckItem[], index: number): boolean {
  const isFirstCheck = index === 0;
  if (isFirstCheck) return true;

  const previousCheck = checks[index - 1];
  const previousAnswer = answersMap[previousCheck.id];
  return previousAnswer === 'yes';
}

/**
 * This method is responsible for resetting all answers that are bellow the current answered check.
 * @param answersMap key value object where key is the check id and the value is the answer.
 * @param checks the checks sorted by priority.
 * @param answeredCheckIndex the index of the current check being answered.
 * @returns the new answersMap .
 */
export function resetAllAnswersBellowIndex(answersMap: AnswersMap, checks: ICheckItem[], answeredCheckIndex: number) {
  const newAnswersMap = { ...answersMap };
  checks.forEach((check, index) => {
    if (index > answeredCheckIndex) {
      newAnswersMap[check.id] = undefined;
    }
  });
  return newAnswersMap;
}

/**
 * This method compares two check items by their priorities.
 * @param check1 first check item
 * @param check2 second check item
 * @returns 1 if first is greater than second, -1 if first is lower than second and 0 if it's equal.
 */
export function compareCheckByPriority(check1: ICheckItem, check2: ICheckItem) {
  if (check1.priority > check2.priority) {
    return 1;
  }
  if (check1.priority < check2.priority) {
    return -1;
  }
  return 0;
}

/**
 * Gets the next check index considering the current index and the checks length.
 * @param currentCheckIndex the current check index.
 * @param checksLength the the checks length
 * @returns the next item to be selected.
 */
export function getNextCheckItemIndex(currentCheckIndex: number, checksLength: number) {
  const nextCheckIndex = currentCheckIndex + 1;
  if (nextCheckIndex > checksLength - 1) {
    return 0;
  }
  return nextCheckIndex;
}

/**
 * Gets the previous check index considering the current index and the the checks length.
 * @param currentCheckIndex the current check index.
 * @param checksLength the the checks length
 * @returns the next item to be selected.
 */
export function getPreviousCheckItemIndex(currentCheckIndex: number, checksLength: number) {
  const previousCheckIndex = currentCheckIndex - 1;
  if (previousCheckIndex < 0) {
    return checksLength - 1;
  }
  return previousCheckIndex;
}
