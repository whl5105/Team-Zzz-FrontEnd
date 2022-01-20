import React, { useState } from "react";
import styled from "styled-components";

import Title from "../components/Title";
import List from "../components/mypage/List";

import { notice, arrow_B_W, arrow_T_W } from "../static/images";

const NoticePage = (props) => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Container>
        <Title backIcon>공지사항</Title>
        {!toggle ? (
          <List
            icon={notice}
            src={arrow_B_W}
            _onClick={() => setToggle(!toggle)}
          >
            저작권 명시
          </List>
        ) : (
          <>
            <List
              icon={notice}
              src={arrow_T_W}
              _onClick={() => setToggle(!toggle)}
            >
              저작권 명시
            </List>
            <TextBox>
              <li>
                경관_도심_호수공원_산책로_공간음_01_Ambeo_ST_192,(재)전주정보문화산업진흥원
                ,공유마당, CC BY
              </li>
              <li>
                도서관에서 공부하는 소리, 한국저작권위원회 공유마당, CC BY
              </li>
              <li>
                상업_카페_아이스아메리카노_제조하다_dMS_ST_192,(재)전주정보문화산업진흥원
                공유마당, CC BY
              </li>
              <li> 촛불 타는소리, 김용배, 공유마당, CC BY</li>
            </TextBox>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  height: inherit;
  box-sizing: border-box;
  padding: 50px 0;
`;

const TextBox = styled.ul`
  background: #22265e;
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  padding: 30px 30px 22px;
  color: #aaa;
  & li {
    list-style: none;
    padding-bottom: 10px;
  }
  & li::before {
    content: "• ";
  }
`;

export default NoticePage;
