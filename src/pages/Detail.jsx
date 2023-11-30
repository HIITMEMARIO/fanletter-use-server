import React, { useState, useRef } from 'react';
import detailpageimg from 'asset/detailpageimg.png';
import trashcanicon from 'asset/trashcanimg.png';
import detailpagebackgruond from 'asset/detailpagebackground.jpg';
import editcontenticon from 'asset/editcontenticon.png';
import finishcontenticon from 'asset/finisheditcontenticon.png';
import gohomeicon from 'asset/gohomeicon.jpg';
import styled from 'styled-components';
import GlobalStyle from 'GlobalStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { editList, deleteList } from 'redux/modules/list';

function Detail() {
  const list = useSelector((state) => {
    return state.list;
  });

  const dispatch = useDispatch();

  const [editValue, setEditValue] = useState('');
  const [editClick, setEditClick] = useState(false);
  const contentRef = useRef(null); // added
  const originalContentRef = useRef(''); // added 2

  const { id } = useParams();
  const filter = list.filter((item) => {
    return item.id === id;
  });

  const navigate = useNavigate();

  const finishEdit = () => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, content: editValue };
      } else return item;
    });
    dispatch(editList(newList));
  };

  const deleteHandler = (id) => {
    const newList = list.filter((item) => item.id !== id);
    if (window.confirm('삭제 하시겠습니까?!')) {
      alert('삭제 되었습니다!!');
      dispatch(deleteList(newList));
    }
  };

  //// --------------------------------------------------------
  return (
    <>
      <GlobalStyle />

      {editClick ? (
        <StContainer>
          <StDetailPageImg>
            {filter.map((item) => {
              return (
                <div key={item.id}>
                  <Stnickname>
                    <StPNickname>{item.nickname}</StPNickname>
                  </Stnickname>
                  <StToWho>To.{item.writedTo}</StToWho>
                  <Stcontents
                    maxLength={100}
                    defaultValue={item.content}
                    onChange={(e) => {
                      setEditValue(e.target.value);
                    }}
                  ></Stcontents>
                  <StTime>
                    <StPtag $fontSize="30px">
                      작성시간 : {item.createdAt}
                    </StPtag>
                  </StTime>
                  <STUserImg src={item.avatar} />
                </div>
              );
            })}
          </StDetailPageImg>

          <StTrashCanBox onClick={() => {}}>
            <StTrashCanIcon src={trashcanicon} />
            <StPtag $fontSize="18px">Recycle Bin</StPtag>
          </StTrashCanBox>

          <StgobackiconBox
            onClick={() => {
              navigate('/');
            }}
          >
            <StGobackIcon src={gohomeicon} />
            <StPtag $fontSize="18px">Go Home</StPtag>
          </StgobackiconBox>

          <StEditContentBox
            onClick={() => {
              if (editValue === originalContentRef.current) {
                alert('수정된 부분이 없습니다!');
              } else {
                finishEdit();
                originalContentRef.current = editValue;
              }
              setEditClick(false);
            }}
          >
            <StEditContentIcon src={editcontenticon} />
            <StPtag $fontSize="18px">Finish Edit</StPtag>
          </StEditContentBox>
        </StContainer>
      ) : (
        <StContainer>
          <StDetailPageImg>
            {filter.map((item) => {
              return (
                <div key={item.id}>
                  <Stnickname>
                    <StPNickname>{item.nickname}</StPNickname>
                  </Stnickname>
                  <StToWho>To.{item.writedTo} </StToWho>
                  <StPContent ref={contentRef}>{item.content}</StPContent>
                  <StTime>
                    <StPtag $fontSize="30px">
                      작성시간 : {item.createdAt}
                    </StPtag>
                  </StTime>
                  <STUserImg src={item.avatar} />
                </div>
              );
            })}
          </StDetailPageImg>

          <StTrashCanBox
            onClick={() => {
              deleteHandler(id);
              navigate('/');
            }}
          >
            <StTrashCanIcon src={trashcanicon} />
            <StPtag $fontSize="18px">Recycle Bin</StPtag>
          </StTrashCanBox>

          <StgobackiconBox
            onClick={() => {
              navigate('/');
            }}
          >
            <StGobackIcon src={gohomeicon} />
            <StPtag $fontSize="18px">Go Home</StPtag>
          </StgobackiconBox>

          <StEditContentBox
            onClick={() => {
              setEditValue(contentRef.current.innerText);
              originalContentRef.current = contentRef.current.innerText; // added
              setEditClick(true);
            }}
          >
            <StEditContentIcon src={finishcontenticon} />
            <StPtag $fontSize="18px">Edit Content</StPtag>
          </StEditContentBox>
        </StContainer>
      )}
    </>
  );
}

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${detailpagebackgruond});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StDetailPageImg = styled.div`
  position: relative;
  background-image: url(${detailpageimg});
  width: 1080px;
  height: 654px;
`;

const StTrashCanBox = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100px;
  height: 100px;
  left: 30px;
  top: 330px;
  &:hover {
    filter: drop-shadow(10px 15px 10px #fac3fa);
  }
`;

const StTrashCanIcon = styled.img`
  object-fit: fill;
  width: 200px;
`;
const StPtag = styled.p`
  font-size: ${(props) => props.$fontSize};
  position: absolute;
  bottom: -30px;
`;

const StgobackiconBox = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100px;
  height: 100px;
  left: 30px;
  top: 30px;
  &:hover {
    filter: drop-shadow(10px 15px 10px #fac3fa);
  }
`;

const StGobackIcon = styled.img`
  object-fit: fill;
  width: 200px;
`;

const StEditContentIcon = styled.img`
  object-fit: fill;
  width: 200px;
`;

const StEditContentBox = styled.div`
  text-align: center;
  cursor: pointer;
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100px;
  height: 100px;
  left: 30px;
  top: 180px;
  &:hover {
    filter: drop-shadow(10px 15px 10px #fac3fa);
  }
`;

const Stnickname = styled.div`
  position: absolute;
  display: flex;
  width: 600px;
  height: 100px;
  padding: 10px;
  top: 100px;
  left: 50px;
`;

const Stcontents = styled.textarea`
  resize: none;
  font-size: 30px;
  position: absolute;
  display: flex;
  width: 1000px;
  height: 200px;
  padding: 30px;
  margin-left: 30px;
  top: 380px;
`;

const StPContent = styled.p`
  position: absolute;
  display: flex;
  width: 1000px;
  height: 200px;
  padding-left: 30px;
  padding-top: 30px;
  padding-right: 30px;
  margin-left: 30px;
  top: 380px;
  font-size: 30px;
  word-break: break-word;
`;

const StTime = styled.div`
  position: absolute;
  display: flex;
  width: 800px;
  background-color: #0088ff;
  top: 330px;
  left: 58px;
`;

const STUserImg = styled.img`
  position: absolute;
  width: 200px;
  border-radius: 50%;
  right: 150px;
  top: 150px;
  outline: 3px double #818181;
`;

const StToWho = styled.p`
  position: absolute;
  top: 280px;
  left: 60px;
  font-size: 30px;
  color: pink;
`;

const StPNickname = styled.p`
  font-size: 60px;
`;
export default Detail;
