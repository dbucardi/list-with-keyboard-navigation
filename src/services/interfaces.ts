export interface ICheckResultItem {
  checkId: string;
  result: 'yes' | 'no';
}

export interface ICheckItem {
  id: string;
  priority: number;
  description: string;
}

export type SubmitCheckResponse = { success?: boolean; results: ICheckResultItem[] };
