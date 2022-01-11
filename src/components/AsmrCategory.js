import React from "react";
import styled from "styled-components";

const AsmrCategory = (props) => {
  const { setCategory } = props;

  const select = (e) => {
    setCategory(e.target.id);
  };

  return (
    <>
      <CategorySelect>
        <Category id="전체" onClick={select}>
          전체
        </Category>
        <Category id="네이쳐" onClick={select}>
          네이쳐
        </Category>
        <Category id="플레이스" onClick={select}>
          플레이스
        </Category>
        <Category id="오브젝트" onClick={select}>
          오브젝트
        </Category>
      </CategorySelect>
    </>
  );
};

const CategorySelect = styled.div`
  width: 100%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.back};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
  margin: auto;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
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
