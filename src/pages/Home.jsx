import styled from 'styled-components';
import usericon from 'asset/usericon.png';

import GlobalStyle from 'GlobalStyle';
import { memberData } from 'memberData';
import { useState } from 'react';
import uuid from 'react-uuid';
import MemberBtnBox from 'components/Home/MemberBtnBox';
import InputBox from '../components/Home/InputBox';
import CardContainer from 'components/Home/CardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from 'redux/modules/list';
import Header from 'components/Header/Header';

function Home() {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [memberSelect, setMemberSelect] = useState('민지');
  const [memberName, setMemberName] = useState('민지');

  const list = useSelector((state) => {
    console.log(state);
    return state.list;
  });

  const dispatch = useDispatch();

  const addCard = () => {
    const newList = {
      createdAt: new Date().toLocaleString('ko', {}),
      id: uuid(),
      nickname: nickname,
      content: content,
      writedTo: memberSelect,
      avatar: usericon,
    };

    if (content === '' && nickname === '') {
      return alert('닉네임과 내용중 둘 중 하나는 써주세요!');
    } else {
      dispatch(addList(newList));
      setNickname('');
      setContent('');
    }
  };

  return (
    <>
      <GlobalStyle />
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
        <CardContainer memberName={memberName} list={list} />
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
