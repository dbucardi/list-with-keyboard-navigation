import styled from 'styled-components';

type MessageType = 'info' | 'success' | 'warning' | 'error';

interface IStyledMessageProps extends React.HTMLProps<HTMLDivElement> {
  messageType: MessageType;
}

const typeToColorMap = {
  ['info' as MessageType]: 'var(--message-info-bg-color)',
  ['success' as MessageType]: 'var(--message-success-bg-color)',
  ['warning' as MessageType]: 'var(--message-warning-bg-color)',
  ['error' as MessageType]: 'var(--message-error-bg-color)',
};

export const StyledMessageContainer = styled.div`
  padding-top: 10px;
  padding: 10px 20px 10px 20px;
`;

export const StyledMessage = styled.div<IStyledMessageProps>`
  padding-top: 10px;
  padding: 10px 20px 10px 20px;
  border-radius: 4px;
  background: ${(props) => typeToColorMap[props.messageType]};
`;
