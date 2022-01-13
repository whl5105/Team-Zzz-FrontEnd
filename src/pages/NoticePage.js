import React from "react";
import styled from "styled-components";

// --- components ---
import Title from "../components/Title";
import List from "../components/mypage/List";

// --- images ---
import notes from "../static/images/mypage/notes_white.svg";
import path_B from "../static/images/mypage/arrow_B_W.svg";
import path_T from "../static/images/mypage/arrow_T_W.svg";

const NoticePage = (props) => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <React.Fragment>
      <Container>
        <Title backIcon>공지사항</Title>
        {!toggle ? (
          <List icon={notes} src={path_B} _onClick={() => setToggle(!toggle)}>
            저작권 명시
          </List>
        ) : (
          <>
            <List icon={notes} src={path_T} _onClick={() => setToggle(!toggle)}>
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
    </React.Fragment>
  );
};

// --- styled-components ---
const Container = styled.div`
  width: 100%;
  height: 100vh;
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
