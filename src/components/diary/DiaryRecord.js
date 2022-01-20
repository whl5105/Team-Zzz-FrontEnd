import React from "react";
import styled from "styled-components";

import Charater from "../../elements/Charater";

const DiaryRecord = (props) => {
  const { list, scoreList, scoreColor, diaryDetail } = props;

  return (
    <>
      <Content>
        {list.map((item, index) => {
          return (
            <div key={index + 1 + "days"}>
              {item.feelScore && item.sleepScore ? (
                <Charater
                  shape="charater"
                  size="56"
                  feelNumber={scoreList.indexOf(item.feelScore) + 1}
                  sleepNumber={scoreList.indexOf(item.sleepScore) + 1}
                  scoreColor={
                    scoreColor[scoreList.indexOf(item.sleepScore) + 1]
                  }
                  _onClick={() => {
                    diaryDetail(index + 1);
                  }}
                  margin="10px auto"
                />
              ) : (
                <Charater
                  shape="charater"
                  size="55"
                  feelNumber={0}
                  sleepNumber={0}
                  sleepColor={scoreColor[0]}
                  _onClick={() => {
                    diaryDetail(index + 1);
                  }}
                  margin="10px auto"
                />
              )}
              <Text>{index + 1}</Text>
            </div>
          );
        })}
      </Content>
    </>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: ${({ theme }) => theme.colors.bg}};
  color: ${({ theme }) => theme.colors.white};
  max-height: 470px;
  margin: 5px auto;
  margin-bottom: 15px;
  text-align: center;
  padding: 0 ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  line-height: ${({ theme }) => theme.lineHeight.small};
  vertical-align: top;
`;

export default DiaryRecord;
