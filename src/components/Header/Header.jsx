import React from 'react';
import logo from 'asset/logo.png';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/modules/authSlice';
import mypageicon from '../../asset/mypageIcon.png';
import Logouticon from '../../asset/logoutIcon.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const expire = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('시간이 만료됐어요! 다시 로그인 해주세요!');
      dispatch(logout());
    }
  };

  return (
    <StHeader>
      <StLogo src={logo} />
      <StMyPageBox
        onClick={() => {
          navigate('/mypage');
          expire();
        }}
      >
        <StMyPageIcon src={mypageicon} />
        <p>My Page</p>
      </StMyPageBox>

      <StLogoutBox
        onClick={() => {
          dispatch(logout());
        }}
      >
        <StLogoutIcon src={Logouticon} />
        <p>Logout</p>
      </StLogoutBox>
    </StHeader>
  );
}

export default Header;

const StHeader = styled.header`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StLogo = styled.img`
  width: 500px;
`;

const StMyPageBox = styled.div`
  flex-direction: column;
  cursor: pointer;
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100px;
  height: 100px;
  right: 160px;
  top: 30px;
  &:hover {
    filter: drop-shadow(10px 15px 10px #fac3fa);
  }

  p {
    text-align: center;
    font-size: 18px;
  }
`;

const StMyPageIcon = styled.img`
  object-fit: fill;
  width: 100px;
`;

const StLogoutBox = styled.div`
  flex-direction: column;
  cursor: pointer;
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100px;
  height: 100px;
  right: 30px;
  top: 30px;

  &:hover {
    filter: drop-shadow(10px 15px 10px #fac3fa);
  }

  p {
    text-align: center;
    font-size: 18px;
  }
`;

const StLogoutIcon = styled.img`
  object-fit: fill;
  width: 100px;
`;
