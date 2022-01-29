import { render, screen, cleanup } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { CheckListPage } from './index';
import * as api from '../../services/api';
import { ICheckItem, SubmitCheckResponse } from '../../services/interfaces';

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('CheckListPage', () => {
  it('Should render the checklist', async () => {
    helper.mockSuccessApi();
    render(renderComponent());
    expect(await helper.findChecklist()).toBeInTheDocument();
  });

  it('Should render the checklist labels', async () => {
    helper.mockSuccessApi();
    render(renderComponent());
    expect(await helper.findCheckListLabelByIndex(0)).toBeInTheDocument();
    expect(await helper.findCheckListLabelByIndex(1)).toBeInTheDocument();
    expect(await helper.findCheckListLabelByIndex(2)).toBeInTheDocument();
    expect(await helper.findCheckListLabelByIndex(3)).toBeInTheDocument();
  });

  it('Should render the checklist labels ordered by priority', async () => {
    helper.mockSuccessApi();
    render(renderComponent());
    expect((await helper.findCheckListLabelByIndex(0)).textContent).toBe('check 1');
    expect((await helper.findCheckListLabelByIndex(1)).textContent).toBe('check 2');
    expect((await helper.findCheckListLabelByIndex(2)).textContent).toBe('check 3');
    expect((await helper.findCheckListLabelByIndex(3)).textContent).toBe('check 4');
  });
});

function renderComponent() {
  return <CheckListPage />;
}

const helper = {
  findChecklist: () => waitFor(() => screen.getByTestId('checklist')),
  findCheckListItemByIndex: (index: number) => waitFor(() => screen.getByTestId(`check-list-item[${index}]`)),
  findCheckListLabelByIndex: (index: number) => waitFor(() => screen.getByTestId(`check-list-label[${index}]`)),
  findSimpleAnswerByIndex: (index: number) => waitFor(() => screen.getByTestId(`simple-answer[${index}]`)),
  findLoading: () => waitFor(() => screen.getByTestId('spinner')),
  findErrorFetching: () => waitFor(() => screen.getByTestId('error-fetching-checks-message')),
  findErrorSubmitting: () => waitFor(() => screen.getByTestId('error-submitting-message')),
  findSentMessage: () => waitFor(() => screen.getByTestId('form-sent-message')),
  mockSuccessApi: () => {
    jest.spyOn(api, 'fetchChecks').mockImplementation((): Promise<ICheckItem[]> => {
      const mockCheckItems: ICheckItem[] = [
        { id: '3', description: 'check 3', priority: 3 },
        { id: '1', description: 'check 1', priority: 1 },
        { id: '4', description: 'check 4', priority: 4 },
        { id: '2', description: 'check 2', priority: 2 },
      ];
      return Promise.resolve(mockCheckItems);
    });

    jest.spyOn(api, 'submitCheckResults').mockImplementation((): Promise<SubmitCheckResponse> => {
      const mockReponse: SubmitCheckResponse = {
        success: true,
        results: [{ checkId: '1', result: 'no' }],
      };
      return Promise.resolve(mockReponse);
    });
  },
  mockFailedApi: () => {
    jest.spyOn(api, 'fetchChecks').mockImplementation((): Promise<ICheckItem[]> => {
      return Promise.reject('Error');
    });

    jest.spyOn(api, 'submitCheckResults').mockImplementation((): Promise<SubmitCheckResponse> => {
      return Promise.reject('Error');
    });
  },
};
