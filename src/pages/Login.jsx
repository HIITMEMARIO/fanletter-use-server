import React, { useState } from 'react';
import styled from 'styled-components';
import input from '../asset/input.png';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from 'redux/modules/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [idValue, setIdValue] = useState('');
  const [pwValue, setPwValue] = useState('');

  const [addMemberIdValue, setAddMemberIdValue] = useState('');
  const [addMemberPwValue, setaddMemberPwValue] = useState('');
  const [addMemberNickNameValue, setAddMemberNickName] = useState('');
  const success = () => {
    toast.success('회원가입에 성공했어요!!');
  };
  const successLogin = () => {
    toast.success('로그인에 성공했어요!!');
  };
  const failLogin = () => {
    toast.error('아이디 혹은 비밀번호를 확인해주세요!!');
  };
  const error = () => toast.error('이미 존재하는 아이디에요!!');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchLogin = () => {
    setIdValue('');
    setPwValue('');
    setAddMemberIdValue('');
    setaddMemberPwValue('');
    setAddMemberNickName('');
    setIsLogin(!isLogin);
  };

  const clickLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const memberLogin = {
        id: idValue,
        password: pwValue,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login?expiresIn=10m`,
        memberLogin
      );
      console.log(response.data);
      dispatch(login(response.data));
      navigate('/');
      successLogin();
    } catch {
      console.log('실패');
      failLogin();
    }
  };

  const clickAddMemberHandler = async (e) => {
    e.preventDefault();

    try {
      const addMember = {
        id: addMemberIdValue,
        password: addMemberPwValue,
        nickname: addMemberNickNameValue,
      };

      console.log(addMember);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        addMember
      );
      console.log(response.data);
      setIsLogin(!isLogin);
      success();
    } catch {
      console.log('실패');
      error();
    }
  };

  return (
    <>
      <StContainer>
        {isLogin ? (
          <form onSubmit={clickLoginHandler}>
            <h1>로그인</h1>
            <div>
              <div>
                <span>ID &nbsp;:</span>
                <input
                  minLength={4}
                  maxLength={12}
                  value={idValue}
                  onChange={(e) => {
                    setIdValue(e.target.value);
                  }}
                />
              </div>
              <div>
                <span>PW :</span>
                <input
                  type="password"
                  minLength={4}
                  maxLength={10}
                  value={pwValue}
                  onChange={(e) => {
                    setPwValue(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                style={{ marginBottom: '20px' }}
                disabled={idValue.length < 4 || pwValue.length < 4}
              >
                로그인
              </button>
              <button type="button" onClick={switchLogin}>
                회원가입
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={clickAddMemberHandler}>
            <h1 style={{ marginBottom: '-50px' }}>회원가입</h1>
            <div>
              <div>
                <span>ID &nbsp;:</span>
                <input
                  value={addMemberIdValue}
                  onChange={(e) => {
                    setAddMemberIdValue(e.target.value);
                  }}
                  placeholder="Id(4~10글자)"
                  minLength={4}
                  maxLength={10}
                  required
                />
              </div>
              <div>
                <span>PW :</span>
                <input
                  value={addMemberPwValue}
                  onChange={(e) => {
                    setaddMemberPwValue(e.target.value);
                  }}
                  required
                  placeholder="PassWord(4~10글자)"
                  minLength={4}
                  maxLength={10}
                />
              </div>
              <div>
                <input
                  placeholder="NICKNAME(1~10글자)"
                  minLength={1}
                  maxLength={10}
                  style={{ marginLeft: '87px' }}
                  value={addMemberNickNameValue}
                  onChange={(e) => {
                    setAddMemberNickName(e.target.value);
                  }}
                />
              </div>
            </div>
            <StButtonBox>
              <button type="button" onClick={switchLogin}>
                취소
              </button>
              <button type="submit">회원가입</button>
            </StButtonBox>
          </form>
        )}
      </StContainer>
      ;
    </>
  );
}

export default Login;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  form {
    position: absolute;
    display: flex;
    flex-direction: column;
    margin: 100px;
    background-image: url(${input});
    background-repeat: no-repeat;
    background-size: contain;
    width: 1080px;
    height: 693px;
    display: flex;
    justify-content: center;
    font-size: 40px;

    h1 {
      align-self: center;
    }

    div {
      margin: 40px;
      margin-left: 10px;
      align-self: center;

      div {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          display: flex;
          width: 100px;
        }
      }
      input {
        outline: 3px double #c3c3c3;
        display: flex;
        margin: -1%;
        height: 50px;
        font-size: 20px;
        width: 400px;
      }
    }

    button {
      outline: 3px double #c3c3c3;
      cursor: pointer;
      width: 180px;
      height: 50px;
      align-self: center;
      margin-left: 10px;
      margin-right: 10px;
      font-size: 30px;
    }
  }
`;

const StButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
