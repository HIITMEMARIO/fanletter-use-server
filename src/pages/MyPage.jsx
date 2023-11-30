import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import input from '../asset/input.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gohomeicon from '../asset/gohomeicon.jpg';

function MyPage() {
  const [isEditProfile, setIsEditProfile] = useState(true);
  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const fileInput = useRef(null);
  const [editNickName, setEditNickName] = useState('');
  const [imgFile, setImgFile] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('avatar') !== 'null') {
      setImage(localStorage.getItem('avatar'));
    }
  }, []);

  console.log(typeof Image);

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  const onChange = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
    } else {
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      );
      return;
    }

    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setImage(imgUrl);
  };

  const userId = localStorage.getItem('userId');

  const handleProfile = async () => {
    localStorage.setItem('nickname', editNickName);

    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    try {
      const editProfile = {
        avatar: imgFile,
        nickname: editNickName,
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/profile`,
        editProfile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      localStorage.setItem('avatar', response.data.avatar);
      console.log(response.data);
      setEditNickName('');
      setIsEditProfile(true);
    } catch {
      console.log('실패');
    }
  };

  // console.log(local);

  return (
    <StContainer>
      <StgobackiconBox
        onClick={() => {
          navigate('/');
        }}
      >
        <StGobackIcon src={gohomeicon} />
        <p>Go Home</p>
      </StgobackiconBox>

      <StModifyMyInfo>
        {isEditProfile ? (
          <>
            <StImg src={Image} />
            <span>{userId}</span>
            <StButtonBox>
              <button onClick={handleEditProfile}>수정하기</button>
            </StButtonBox>
          </>
        ) : (
          <>
            <StImg
              src={Image}
              onClick={() => {
                fileInput.current.click();
              }}
              style={{ cursor: 'pointer' }}
            />
            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/jpg,impge/png,image/jpeg"
              name="profile_img"
              onChange={onChange}
              ref={fileInput}
            />
            <span>{userId}</span>
            <input
              value={editNickName}
              onChange={(e) => {
                setEditNickName(e.target.value);
              }}
            />
            <StButtonBox>
              <button onClick={handleProfile}>수정완료</button>
              <button onClick={handleEditProfile}>취소</button>
            </StButtonBox>
          </>
        )}
      </StModifyMyInfo>
    </StContainer>
  );
}

export default MyPage;

const StContainer = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  position: relative;
`;
const StModifyMyInfo = styled.div`
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
  align-items: center;

  input {
    margin: 10px;
    height: 30px;
    border: 3px double #818181;
  }

  label {
    background-color: aliceblue;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  button {
    width: 150px;
    height: 50px;
    margin: 10px;
    font-size: 30px;
  }
`;

const StImg = styled.img`
  margin: 20px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const StButtonBox = styled.div`
  margin: 10px;
`;

const StgobackiconBox = styled.div`
  flex-direction: column;
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

  p {
    text-align: center;
    font-size: 18px;
  }
`;

const StGobackIcon = styled.img`
  object-fit: fill;
  width: 100px;
`;
