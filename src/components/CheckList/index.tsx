import React from 'react';
import { CheckListItem } from './CheckListItem';
import { StyledCheckList } from './style';

interface ICheckListProps {
  children: React.ReactNode;
}

function CheckList(props: ICheckListProps) {
  const { children } = props;
  return <StyledCheckList>{children}</StyledCheckList>;
}

export { CheckList, CheckListItem };
