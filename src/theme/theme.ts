import { createGlobalStyle } from 'styled-components';

export const ThemeStyles = createGlobalStyle`
  :root{
    --primary-color: #004e5f;
    --highlight-color: #def7f7;
    --disabled-background-color: #e6ebf4;
    --disabled-color: #bdc0cf;
    font-family: sans-serif;
    font-size: 16px;
  }
`;
