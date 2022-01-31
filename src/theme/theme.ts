import { createGlobalStyle } from 'styled-components';

export const ThemeStyles = createGlobalStyle`
  :root{
    --primary-color: #004e5f;
    --highlight-color: #def7f7;
    --disabled-background-color: #e6ebf4;
    --disabled-color: #bdc0cf;
    --message-info-bg-color: #cce5ff;
    --message-success-bg-color: #d4edda;
    --message-warning-bg-color: #fff3cd;
    --message-error-bg-color: #f8d7da;
    font-family: sans-serif;
    font-size: 16px;
  }
`;
