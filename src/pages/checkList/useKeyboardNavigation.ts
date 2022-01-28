import { useEffect } from 'react';

export enum NavigationActionType {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Yes = 'Yes',
  No = 'No',
}

const keyToNavigationActionMap: any = {
  ArrowDown: NavigationActionType.ArrowDown,
  ArrowUp: NavigationActionType.ArrowUp,
  '1': NavigationActionType.Yes,
  '2': NavigationActionType.No,
};

export function useKeyboardNavigation(onNavigation: (type: NavigationActionType) => void) {
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      const actionType = keyToNavigationActionMap[e.key];
      actionType && onNavigation(actionType);
    };

    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [onNavigation]);
}
