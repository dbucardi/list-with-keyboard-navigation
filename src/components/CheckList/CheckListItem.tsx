import React from 'react';
import { StyledCheckListItem } from './style';

interface ICheckListItemProps {
  children: React.ReactNode;
}

export function CheckListItem(props: ICheckListItemProps) {
  const { children } = props;
  return <StyledCheckListItem tabIndex={0}>{children}</StyledCheckListItem>;
}
