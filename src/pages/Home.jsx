import styled from 'styled-components';
import GlobalStyle from 'GlobalStyle';
import { memberData } from 'memberData';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import MemberBtnBox from 'components/Home/MemberBtnBox';
import InputBox from '../components/Home/InputBox';
import CardContainer from 'components/Home/CardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { __addList } from 'redux/modules/list';
import Header from 'components/Header/Header';
import { logout } from 'redux/modules/authSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [memberSelect, setMemberSelect] = useState('민지');
  const [memberName, setMemberName] = useState('민지');
  const [letterData, setLetterData] = useState([]);

  const { isLoading, letter } = useSelector((state) => {
    return state.letters;
  });

  const auth = useSelector((state) => {
    return state.auth;
  });
  console.log('auth:', auth);
  const avatar = auth.avatar;
  const userId = auth.userId;
  const userNickname = auth.nickname;

  // console.log('addCardavatar:', avatar);
  const success = () => toast.success('게시글을 등록했어요!!');
  const warning = () =>
    toast.warning('시간이 만료됐어요! 다시 로그인 해주세요!');
  const warningContent = () => toast.warning('내용을 써주세요!!');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      setLetterData(letter);
    }
  }, [isLoading, letter]);

  console.log(letterData);

  const addCard = async () => {
    const accessToken = localStorage.getItem('accessToken');

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
      const newList = {
        createdAt: new Date().toLocaleString('ko', {}),
        id: uuid(),
        nickname: userNickname,
        content: content,
        writedTo: memberSelect,
        avatar: avatar,
        userId: userId,
      };
      console.log('avatar:', avatar);

      if (content === '') {
        return warningContent();
      } else {
        dispatch(__addList(newList));
        setNickname('');
        setContent('');
        success();
      }
    } catch (error) {
      console.log(error);
      warning();
      dispatch(logout());
    }
  };

  return (
    <>
      <Stcontainer>
        <Header />
        <MemberBtnBox memberData={memberData} setMemberName={setMemberName} />
        <InputBox
          nickname={nickname}
          setNickname={setNickname}
          content={content}
          setContent={setContent}
          setMemberSelect={setMemberSelect}
          memberData={memberData}
          addCard={addCard}
        />
        <CardContainer
          memberName={memberName}
          list={letterData}
          avatar={avatar}
        />
      </Stcontainer>
    </>
  );
}

const Stcontainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default Home;
