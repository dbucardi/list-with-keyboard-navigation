import { SubmitCheckResponse, ICheckItem, ICheckResultItem } from './interfaces';

export function fetchChecks(): Promise<ICheckItem[]> {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() <= 0.8
          ? resolve([
              {
                id: 'aaa',
                priority: 10,
                description: 'Verification item 1',
              },
              {
                id: 'bbb',
                priority: 5,
                description: 'Verification item 2',
              },
              {
                id: 'ccc',
                priority: 7,
                description: 'Verification item 3',
              },
              {
                id: 'ddd',
                priority: 3,
                description: 'Verification item 4',
              },
            ])
          : reject({ success: false }),
      500
    )
  );
}

/**
 * @param {Object[]} results - The list of check results
 * @param {string} results[].checkId - Check id
 * @param {string} results[].result - Result value (yes / no)
 */
export function submitCheckResults(results: ICheckResultItem[]): Promise<SubmitCheckResponse> {
  return new Promise((resolve, reject) =>
    setTimeout(() => (Math.random() <= 0.8 ? resolve({ results }) : reject({ success: false, results: [] })), 500)
  );
}
