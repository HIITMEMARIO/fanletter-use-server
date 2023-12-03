import GlobalStyle from 'GlobalStyle';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { __getList } from 'redux/modules/list';
import Router from 'shared/Router';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('asdfadfadfasdfadddff');
    dispatch(__getList());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
