import React, { useLayoutEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import useTheme from './utils/useTheme';
import store from './redux/store';import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const ConfigAppWrapper = ({ children }) => {
  const { lang } = useSelector(store => store.app);
  const theme = useTheme();
  const bgcolor = useMemo(() => theme.palette.background.default, [theme]);
  
  useLayoutEffect(() => {
    document.head.parentElement.lang = lang;
    document.body.parentElement.style.backgroundColor = bgcolor;
    document.body.style.backgroundColor = bgcolor;
  }, [lang, bgcolor]);

  return ( 
    <ThemeProvider theme={theme}>
          {children}
    </ThemeProvider>
    );
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
