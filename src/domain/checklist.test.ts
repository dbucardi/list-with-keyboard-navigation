import {
  compareCheckByPriority,
  createDisabledChecksMap,
  isCheckFormSubmitAllowed,
  resetAllAnswersBellowIndex,
  getNextCheckItemIndex,
  getPreviousCheckItemIndex,
} from './checklist';
import { AnswersMap, AnswerValue } from './interfaces';
import { ICheckItem } from '../services/interfaces';

const mockedChecks: ICheckItem[] = [
  { id: 'aaa', description: 'Check 1', priority: 1 },
  { id: 'bbb', description: 'Check 2', priority: 2 },
  { id: 'ccc', description: 'Check 3', priority: 3 },
  { id: 'ddd', description: 'Check 4', priority: 3 },
];

describe('Checklist function createDisabledChecksMap', () => {
  it('Only the first check should be enabled when No answer was given', () => {
    const result = createDisabledChecksMap({}, mockedChecks);
    expect(result['aaa']).toBeFalsy();
    expect(result['bbb']).toBeTruthy();
    expect(result['ccc']).toBeTruthy();
    expect(result['ddd']).toBeTruthy();
  });

  it('Only the check immediately bellow the Yes answer should be enabled', () => {
    const result = createDisabledChecksMap({ aaa: 'yes' }, mockedChecks);
    expect(result['aaa']).toBeFalsy();
    expect(result['bbb']).toBeFalsy();
    expect(result['ccc']).toBeTruthy();
    expect(result['ddd']).toBeTruthy();
  });

  it('Checks bellow a No answer should be disabled', () => {
    const result = createDisabledChecksMap({ aaa: 'yes', bbb: 'no' }, mockedChecks);
    expect(result['aaa']).toBeFalsy();
    expect(result['bbb']).toBeFalsy();
    expect(result['ccc']).toBeTruthy();
    expect(result['ddd']).toBeTruthy();
  });
});

describe('Checklist function isCheckFormSubmitAllowed', () => {
  it('Submit should not be allowed when no answers was given', () => {
    const result = isCheckFormSubmitAllowed({}, mockedChecks);
    expect(result).toBeFalsy();
  });

  it('Submit should be allowed when at least one No answer was given', () => {
    expect(isCheckFormSubmitAllowed({ aaa: 'no' }, mockedChecks)).toBeTruthy();
    expect(isCheckFormSubmitAllowed({ aaa: 'yes', bbb: 'no' }, mockedChecks)).toBeTruthy();
    expect(isCheckFormSubmitAllowed({ aaa: 'yes', bbb: 'yes', ccc: 'no' }, mockedChecks)).toBeTruthy();
    expect(isCheckFormSubmitAllowed({ aaa: 'yes', bbb: 'yes', ccc: 'yes', ddd: 'no' }, mockedChecks)).toBeTruthy();
  });

  it('Submit should be allowed when all answers have been answered', () => {
    const result = isCheckFormSubmitAllowed({ aaa: 'yes', bbb: 'yes', ccc: 'yes', ddd: 'yes' }, mockedChecks);
    expect(result).toBeTruthy();
  });
});

describe('Checklist function resetAllAnswersBellowIndex', () => {
  it('All answers bellow the answered check should be empty', () => {
    const allAnswersYes: AnswersMap = { aaa: 'yes', bbb: 'yes', ccc: 'yes', ddd: 'yes' };
    const result = resetAllAnswersBellowIndex(allAnswersYes, mockedChecks, 0);
    expect(result['aaa']).toBe('yes' as AnswerValue);
    expect(result['bbb']).toBeUndefined();
    expect(result['ccc']).toBeUndefined();
    expect(result['ddd']).toBeUndefined();

    const result2 = resetAllAnswersBellowIndex(allAnswersYes, mockedChecks, 1);
    expect(result2['aaa']).toBe('yes' as AnswerValue);
    expect(result2['bbb']).toBe('yes' as AnswerValue);
    expect(result2['ccc']).toBeUndefined();
    expect(result2['ddd']).toBeUndefined();
  });
});

describe('Checklist function compareCheckByPriority', () => {
  it('Should return -1 when the second item have the greater priority', () => {
    const result = compareCheckByPriority(
      { id: 'aaa', description: 'first', priority: 1 },
      { id: 'bbb', description: 'second', priority: 2 }
    );
    expect(result).toBe(-1);
  });

  it('Should return 1 when the second item have the lower priority', () => {
    const result = compareCheckByPriority(
      { id: 'aaa', description: 'first', priority: 2 },
      { id: 'bbb', description: 'second', priority: 1 }
    );
    expect(result).toBe(1);
  });

  it('Should return 0 when the priorities are equal', () => {
    const result = compareCheckByPriority(
      { id: 'aaa', description: 'first', priority: 1 },
      { id: 'bbb', description: 'second', priority: 1 }
    );
    expect(result).toBe(0);
  });
});

describe('Checklist function getNextCheckItemIndex', () => {
  it('Should return the next index', () => {
    expect(getNextCheckItemIndex(0, 4)).toBe(1);
    expect(getNextCheckItemIndex(1, 4)).toBe(2);
    expect(getNextCheckItemIndex(2, 4)).toBe(3);
    expect(getNextCheckItemIndex(0, 0)).toBe(0);
  });

  it('Should return the first index if the current index is the last one', () => {
    expect(getNextCheckItemIndex(3, 4)).toBe(0);
    expect(getNextCheckItemIndex(1, 2)).toBe(0);
    expect(getNextCheckItemIndex(29, 30)).toBe(0);
  });
});

describe('Checklist function getPreviousCheckItemIndex', () => {
  it('Should return the previous item', () => {
    expect(getPreviousCheckItemIndex(2, 4)).toBe(1);
    expect(getPreviousCheckItemIndex(3, 4)).toBe(2);
  });

  it('Should return the last index if first index is selected', () => {
    expect(getPreviousCheckItemIndex(0, 4)).toBe(3);
    expect(getPreviousCheckItemIndex(0, 2)).toBe(1);
    expect(getPreviousCheckItemIndex(0, 30)).toBe(29);
  });
});
