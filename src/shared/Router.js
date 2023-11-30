import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Detail from 'pages/Detail';
import Login from 'pages/Login';
import Layout from 'components/Layout/Layout';
import { useSelector } from 'react-redux';
import MyPage from 'pages/MyPage';

const Router = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin);
  return (
    <BrowserRouter>
      {isLogin ? (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
          </Route>
        </Routes>
      ) : (
        <>
          <Navigate replace to={'/login'} />
          <Routes>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
