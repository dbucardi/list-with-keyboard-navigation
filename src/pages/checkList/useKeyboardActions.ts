import { useEffect } from 'react';

export enum KeyboardActionType {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Yes = 'Yes',
  No = 'No',
}

const keyToKeyboardActionMap: any = {
  ArrowDown: KeyboardActionType.ArrowDown,
  ArrowUp: KeyboardActionType.ArrowUp,
  '1': KeyboardActionType.Yes,
  '2': KeyboardActionType.No,
};

export function useKeyboardActions(onKeyboardAction: (type: KeyboardActionType) => void) {
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      const actionType = keyToKeyboardActionMap[e.key];
      actionType && onKeyboardAction(actionType);
    };

    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyboardAction]);
}
