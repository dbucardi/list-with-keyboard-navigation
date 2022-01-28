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
  const answeredAllQuestions = Object.keys(answersMap).length === checks.length;
  const allYesAnswers = answeredAllQuestions && Object.keys(answersMap).every((key) => answersMap[key] === 'yes');
  if (allYesAnswers || hasNoResponse) {
    return true;
  }
  return false;
}

/**
 * This method creates a key value object identifying if the check should be disabled or enabled.
 * @param answersMap key value object where key is the check id and the value is the answer.
 * @param checks the checks sorted by priority.
 * @returns a key value object identifying if the check should be disabled or enabled.
 */
export function createDisabledQuestionsMap(answersMap: AnswersMap, checks: ICheckItem[]): { [key: string]: boolean } {
  return checks.reduce((map, check, index) => {
    const isFirstQuestion = index === 0;
    if (isFirstQuestion) return { ...map, [check.id]: false };

    const previousQuestion = checks[index - 1];
    const previousAnswer = answersMap[previousQuestion.id];
    const enableQuestion = previousAnswer === 'yes';
    return { ...map, [check.id]: !enableQuestion };
  }, {});
}

/**
 * This method is responsible for resetting all answers that are ahead of the current answered check.
 * @param answersMap key value object where key is the check id and the value is the answer.
 * @param checks the checks sorted by priority.
 * @param answeredCheckIndex the index of the current check being answered.
 * @returns the new answersMap .
 */
export function resetAnswersAhead(answersMap: AnswersMap, checks: ICheckItem[], answeredCheckIndex: number) {
  const newAnswersMap = { ...answersMap };
  checks.forEach((check, index) => {
    if (index > answeredCheckIndex) {
      newAnswersMap[check.id] = undefined;
    }
  });
  return newAnswersMap;
}
