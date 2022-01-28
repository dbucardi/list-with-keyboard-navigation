import React, { useLayoutEffect, useRef } from 'react';
import { StyledCheckListItem } from './style';

interface ICheckListItemProps {
  children: React.ReactNode;
  active: boolean;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLLIElement>;
}

export function CheckListItem(props: ICheckListItemProps) {
  const { children, active, disabled = false, onFocus = () => {} } = props;
  const itemRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (active) {
      itemRef.current?.focus();
    } else {
      itemRef.current?.blur();
    }
  }, [active]);

  return (
    <StyledCheckListItem tabIndex={disabled ? -1 : 0} onFocus={onFocus} ref={itemRef}>
      {children}
    </StyledCheckListItem>
  );
}
