import React, { useEffect } from 'react';
import { AnswerValue } from '../../domain/interfaces';

enum KeyboardActionType {
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

interface IKeyboardNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  onChangeAnswer: (answer: AnswerValue) => void;
}

export function KeyboardNavigation(props: IKeyboardNavigationProps) {
  const { onNext, onPrevious, onChangeAnswer } = props;

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      const actionType = keyToKeyboardActionMap[e.key];
      if (!actionType) return;

      switch (actionType) {
        case KeyboardActionType.ArrowDown:
          onNext();
          break;
        case KeyboardActionType.ArrowUp:
          onPrevious();
          break;
        case KeyboardActionType.Yes:
          onChangeAnswer('yes');
          break;
        case KeyboardActionType.No:
          onChangeAnswer('no');
          break;
      }
    };

    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [onNext, onPrevious, onChangeAnswer]);

  return <div></div>;
}
