import React, { useState, useEffect } from 'react';
import detailpageimg from 'asset/detailpageimg.png';
import trashcanicon from 'asset/trashcanimg.png';
import detailpagebackgruond from 'asset/detailpagebackground.jpg';
import editcontenticon from 'asset/editcontenticon.png';
import finishcontenticon from 'asset/finisheditcontenticon.png';
import gohomeicon from 'asset/gohomeicon.jpg';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { __deleteList, __editList } from 'redux/modules/list';
import axios from 'axios';
import { logout } from 'redux/modules/authSlice';
import { toast } from 'react-toastify';

function Detail() {
  const { isLoading, letter } = useSelector((state) => {
    console.log(state);
    return state.letters;
  });

  const success = () => toast.success('게시글을 삭제했어요!!');
  const errorToken = () =>
    toast.error('시간이 만료됐어요! 다시 로그인 해주세요!');
  const warningContent = () => toast.warning('수정사항이 없어요!!');
  const successEdit = () => toast.success('게시글을 수정했어요!!');

  useEffect(() => {
    if (!isLoading) {
      const filter = letter.filter((item) => {
        return item.id === id;
      });
      console.log('filter', filter);
      setLetterData(filter);
      setEditValue(filter[0]?.content);
    }
  }, [letter, isLoading]);

  const auth = useSelector((state) => {
    return state.auth;
  });

  const userId = auth.userId;

  const dispatch = useDispatch();

  const [editValue, setEditValue] = useState('');
  const [editClick, setEditClick] = useState(false);
  const [letterData, setLetterData] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const finishEdit = () => {
    if (editValue === letterData[0].content) {
      warningContent();
    } else {
      dispatch(__editList({ id: id, content: editValue }));
      successEdit();
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm('삭제 하시겠습니까?!')) {
      success();
      dispatch(__deleteList(id));
    }
  };

  const accessToken = localStorage.getItem('accessToken');
  const nickname = localStorage.getItem('nickname');

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
      errorToken();
      dispatch(logout());
    }
  };
  //// --------------------------------------------------------
  return (
    <>
      {editClick ? (
        <StContainer>
          <StDetailPageImg>
            {letterData.map((item) => {
              return (
                <div key={item.id}>
                  <Stnickname>
                    <StPNickname>{nickname}</StPNickname>
                  </Stnickname>
                  <StToWho>To.{item.writedTo}</StToWho>
                  <Stcontents
                    maxLength={100}
                    value={editValue}
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

          <StgobackiconBox
            onClick={() => {
              expire();
              navigate('/');
            }}
          >
            <StGobackIcon src={gohomeicon} />
            <StPtag $fontSize="18px">Go Home</StPtag>
          </StgobackiconBox>

          <StEditContentBox
            onClick={() => {
              finishEdit();
              setEditClick(false);
              expire();
            }}
          >
            <StEditContentIcon src={editcontenticon} />
            <StPtag $fontSize="18px">Finish Edit</StPtag>
          </StEditContentBox>

          <StTrashCanBox>
            <StTrashCanIcon src={trashcanicon} />
            <StPtag $fontSize="18px">Recycle Bin</StPtag>
          </StTrashCanBox>
        </StContainer>
      ) : (
        <>
          {letterData.map((item) => {
            return (
              <>
                <StContainer>
                  <StDetailPageImg>
                    <div key={item.id}>
                      <Stnickname>
                        <StPNickname>{item.nickname}</StPNickname>
                      </Stnickname>
                      <StToWho>To.{item.writedTo} </StToWho>
                      <StPContent>{item.content}</StPContent>
                      <StTime>
                        <StPtag $fontSize="30px">
                          작성시간 : {item.createdAt}
                        </StPtag>
                      </StTime>
                      <STUserImg src={item.avatar} />
                    </div>
                  </StDetailPageImg>

                  <StgobackiconBox
                    onClick={() => {
                      expire();
                      navigate('/');
                    }}
                  >
                    <StGobackIcon src={gohomeicon} />
                    <StPtag $fontSize="18px">Go Home</StPtag>
                  </StgobackiconBox>

                  {item.userId === userId ? (
                    <>
                      <StTrashCanBox
                        onClick={() => {
                          deleteHandler(id);
                          navigate('/');
                          expire();
                        }}
                      >
                        <StTrashCanIcon src={trashcanicon} />
                        <StPtag $fontSize="18px">Recycle Bin</StPtag>
                      </StTrashCanBox>

                      <StEditContentBox
                        onClick={() => {
                          setEditClick(true);
                          expire();
                        }}
                      >
                        <StEditContentIcon src={finishcontenticon} />
                        <StPtag $fontSize="18px">Edit Content</StPtag>
                      </StEditContentBox>
                    </>
                  ) : (
                    ''
                  )}
                </StContainer>
              </>
            );
          })}
        </>
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
  height: 200px;
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
