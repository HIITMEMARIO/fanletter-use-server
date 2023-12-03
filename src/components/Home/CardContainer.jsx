import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import NoCard from './NoCard';
import { useSelector } from 'react-redux';

function CardContainer({ memberName }) {
  const [letters, setLetters] = useState([]);
  const letter = useSelector((state) => {
    return state.letters.letter;
  });
  console.log('letters', letters);
  useEffect(() => {
    const filteredList = letter.filter((item) => {
      return memberName === item.writedTo;
    });
    console.log(filteredList);
    setLetters(filteredList);
  }, [letter, memberName]);

  return (
    <StCardContainer>
      {letters?.length === 0 ? (
        <NoCard />
      ) : (
        letters?.map((item) => {
          console.log(item);
          return (
            <Comment
              key={item.id}
              id={item.id}
              nickname={item.nickname}
              content={item.content}
              userId={item.userId}
              avatar={item.avatar}
            />
          );
        })
      )}
    </StCardContainer>
  );
}

const StCardContainer = styled.div`
  width: 1000px;
  display: flex;
  background-color: #818181;
  flex-direction: column-reverse;
  align-items: center;
  outline: thick double #c3c3c3;
`;

export default CardContainer;
