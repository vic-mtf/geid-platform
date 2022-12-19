import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import useTheme from './utils/useTheme';
import { ThemeProvider } from '@mui/material';
import store from './redux/store';

const ConfigAppWrapper = ({ children }) => {
  const {lang} = useSelector(store => store.app);
  const theme = useTheme();
  useLayoutEffect(() => {
    document.head.parentElement.lang = lang;
  }, [lang]);
  return ( <ThemeProvider theme={theme}>{children}</ThemeProvider> );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ConfigAppWrapper>
        <App />
      </ConfigAppWrapper>
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
