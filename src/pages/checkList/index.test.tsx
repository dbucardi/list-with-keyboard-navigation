import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor, within } from '@testing-library/dom';
import { CheckListPage } from './index';
import * as api from '../../services/api';
import { ICheckItem, SubmitCheckResponse } from '../../services/interfaces';

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('CheckListPage', () => {
  it('Should render the checklist with the first check enabled', async () => {
    helper.mockSuccessFetchChecks();
    render(renderComponent());
    const firstCheckItem = await helper.findCheckListItemByIndex(0);
    const options = await helper.findAnswerOptions(firstCheckItem);
    const checklist = await helper.findChecklist();

    expect(checklist).toBeInTheDocument();
    expect(await helper.findSubmitBtn()).toHaveAttribute('disabled');
    expect(options).toHaveLength(2);
    expect(options[0]).not.toHaveAttribute('disabled');
    expect(options[1]).not.toHaveAttribute('disabled');
  });

  it('Should render the loading message while fetching data', async () => {
    helper.mockLoadingFetchChecks();
    render(renderComponent());
    expect(await helper.findLoading()).toBeInTheDocument();
  });

  it('Should render the error message when could not fetch the data', async () => {
    helper.mockFailedFetchChecks();
    render(renderComponent());
    expect(await helper.findErrorFetching()).toBeInTheDocument();
  });

  it('Should render the error when could not submit the data', async () => {
    helper.mockSuccessFetchChecks();
    helper.mockFailedSubmitCheckResults();
    render(renderComponent());
    const firstCheckItem = await helper.findCheckListItemByIndex(0);
    const options = await helper.findAnswerOptions(firstCheckItem);
    userEvent.click(options[1]);
    userEvent.click(await helper.findSubmitBtn());

    expect(await helper.findErrorSubmitting()).toBeInTheDocument();
  });

  it('Should render success message when submit was done successfully', async () => {
    helper.mockSuccessFetchChecks();
    helper.mockSuccessSubmitCheckResults();
    render(renderComponent());
    const firstCheckItem = await helper.findCheckListItemByIndex(0);
    const options = await helper.findAnswerOptions(firstCheckItem);
    userEvent.click(options[1]);
    userEvent.click(await helper.findSubmitBtn());
    expect(await helper.findSentMessage()).toBeInTheDocument();
  });

  it('Should render the checklist labels ordered by priority', async () => {
    helper.mockSuccessFetchChecks();
    render(renderComponent());

    const checkItem1 = await helper.findCheckListItemByIndex(0);
    const checkItem2 = await helper.findCheckListItemByIndex(1);
    const checkItem3 = await helper.findCheckListItemByIndex(2);
    const checkItem4 = await helper.findCheckListItemByIndex(3);

    expect(await helper.findCheckListLabelByText(checkItem1, 'check 1')).toBeInTheDocument();
    expect(await helper.findCheckListLabelByText(checkItem2, 'check 2')).toBeInTheDocument();
    expect(await helper.findCheckListLabelByText(checkItem3, 'check 3')).toBeInTheDocument();
    expect(await helper.findCheckListLabelByText(checkItem4, 'check 4')).toBeInTheDocument();
  });
});

function renderComponent() {
  return <CheckListPage />;
}

const helper = {
  findChecklist: () => waitFor(() => screen.getByTestId('checklist')),
  findCheckListItemByIndex: (index: number) => waitFor(() => screen.getByTestId(`check-list-item[${index}]`)),
  findCheckListLabelByText: (parentElement: HTMLElement, labelText: string) =>
    waitFor(() => within(parentElement).getByText(labelText)),
  findAnswerOptions: (parentElement: HTMLElement) => waitFor(() => within(parentElement).getAllByRole('radio')),
  findSubmitBtn: () => waitFor(() => screen.getByTestId('submit-btn')),
  findLoading: () => waitFor(() => screen.getByText('Loading...')),
  findErrorFetching: () => waitFor(() => screen.getByTestId('error-fetching-checks-message')),
  findErrorSubmitting: () => waitFor(() => screen.getByTestId('error-submitting-message')),
  findSentMessage: () => waitFor(() => screen.getByTestId('form-sent-message')),
  mockSuccessFetchChecks: () => {
    jest.spyOn(api, 'fetchChecks').mockImplementation((): Promise<ICheckItem[]> => {
      const mockCheckItems: ICheckItem[] = [
        { id: '3', description: 'check 3', priority: 3 },
        { id: '1', description: 'check 1', priority: 1 },
        { id: '4', description: 'check 4', priority: 4 },
        { id: '2', description: 'check 2', priority: 2 },
      ];
      return Promise.resolve(mockCheckItems);
    });
  },
  mockLoadingFetchChecks: () => {
    jest.spyOn(api, 'fetchChecks').mockImplementation((): Promise<ICheckItem[]> => {
      return new Promise(() => {});
    });
  },
  mockSuccessSubmitCheckResults: () => {
    jest.spyOn(api, 'submitCheckResults').mockImplementation((): Promise<SubmitCheckResponse> => {
      const mockReponse: SubmitCheckResponse = {
        success: true,
        results: [{ checkId: '1', result: 'no' }],
      };
      return Promise.resolve(mockReponse);
    });
  },
  mockFailedFetchChecks: () => {
    jest.spyOn(api, 'fetchChecks').mockImplementation((): Promise<ICheckItem[]> => {
      return Promise.reject('Error');
    });
  },
  mockFailedSubmitCheckResults: () => {
    jest.spyOn(api, 'submitCheckResults').mockImplementation((): Promise<SubmitCheckResponse> => {
      return Promise.reject('Error');
    });
  },
};
