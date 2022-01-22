import React from "react";
import styled from "styled-components";

const AsmrCategory = (props) => {
  const { setCategory } = props;

  const categorySelect = (e) => {
    setCategory(e.target.id);
  };

  return (
    <>
      <Wrap>
        <Category id="전체" onClick={categorySelect}>
          전체
        </Category>
        <Category id="네이쳐" onClick={categorySelect}>
          네이쳐
        </Category>
        <Category id="플레이스" onClick={categorySelect}>
          플레이스
        </Category>
        <Category id="오브젝트" onClick={categorySelect}>
          오브젝트
        </Category>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  border-radius: 12px;
  display: flex;
  padding: 8px 0px;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  background-color: ${({ theme }) => theme.colors.back};
  cursor: pointer;
`;

const Category = styled.div`
  width: 20%;
  border-radius: 8px;
  line-height: 36px;
  background-color: ${({ theme }) => theme.colors.back};
  text-align: center;
  color: white;
  margin: auto;
`;

export default AsmrCategory;
