import React from "react";
import styled from "styled-components";

import notes from "../static/images/mypage/notes.svg";
import nextIcon from "../static/images/icon/nextIcon.svg";
import dot from "../static/images/mypage/dot.svg";

const NoticePage = (props) => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <React.Fragment>
      <Container>
        <Title>
          <p
            style={{
              // position: "absolute",
              // width: "150px",
              // height: "22px",
              // left: "20px",
              // top: "70px",
              fontSize: "22px",
              lineHeight: "100%",
              color: "white",
              // margin: "0px",
            }}
          >
            공지사항
          </p>
        </Title>

        <Notice>
          <Inside>
            <Icon alt="" src={notes}></Icon>
            <Text onClick={() => setToggle(!toggle)}>저작권 명시</Text>
          </Inside>

          {toggle ? (
            <Icon
              src={nextIcon}
              alt=""
              style={{ transform: `rotate(90deg)` }}
              onClick={() => setToggle(!toggle)}
            ></Icon>
          ) : (
            <Icon
              src={nextIcon}
              alt=""
              style={{ transform: `rotate(0deg)` }}
              onClick={() => setToggle(!toggle)}
            ></Icon>
          )}
        </Notice>
        {toggle ? (
          <Content>
            <div>
              <Icon
                src={dot}
                alt=""
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "33px",
                }}
              ></Icon>
              <p
                style={{
                  position: "absolute",
                  width: "315px",
                  height: "54px",
                  left: "30px",
                  top: "28px",
                  color: "#aaa",
                  fontSize: "12px",
                  lineHeight: "18px",
                }}
              >
                경관_도심_호수공원_산책로_공간음_01_Ambeo_ST_192,(재)전주정보문화산업진흥원
                ,공유마당, CC BY
              </p>
            </div>
            <div>
              <Icon
                src={dot}
                alt=""
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "73px",
                }}
              ></Icon>

              <p
                style={{
                  position: "absolute",
                  width: "315px",
                  height: "20px",
                  left: "30px",
                  top: "68px",
                  color: "#aaa",
                  fontSize: "12px",
                  lineHeight: "18px",
                }}
              >
                도서관에서 공부하는 소리, 한국저작권위원회 공유마당, CC BY
              </p>
            </div>
            <div>
              <Icon
                src={dot}
                alt=""
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "98px",
                }}
              ></Icon>

              <p
                style={{
                  position: "absolute",
                  width: "315px",
                  height: "40px",
                  left: "30px",
                  top: "93px",
                  color: "#aaa",
                  fontSize: "12px",
                  lineHeight: "18px",
                }}
              >
                상업_카페_아이스아메리카노_제조하다_dMS_ST_192,(재)전주정보문화산업진흥원
                공유마당, CC BY
              </p>
            </div>
            <div>
              <Icon
                src={dot}
                alt=""
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "143px",
                }}
              ></Icon>

              <p
                style={{
                  position: "absolute",
                  width: "315px",
                  height: "18px",
                  left: "30px",
                  top: "138px",
                  color: "#aaa",
                  fontSize: "12px",
                  lineHeight: "18px",
                }}
              >
                촛불 타는소리, 김용배, 공유마당, CC BY
              </p>
            </div>
          </Content>
        ) : null}
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 0;
`;
const Notice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;

  /* position: absolute; */
  width: 100%;
  height: 56px;
  /* left: 20px;
  top: 112px; */
  /* box-sizing: border-box; */
  box-sizing: border-box;
`;
const Title = styled.div`
  width: 100%;
  /* background: #6e6e6e78; */
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
`;
const Inside = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  position: static;
  width: 265px;
  height: 24px;
  left: 0px;
  top: 16px;

  flex: none;
  order: 0;
  flex-grow: 1;
  margin: 0px 6px;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 204px;
  left: 0px;
  right: 0px;
  top: 180px;
  background: #22265e;
  /* bottom: 49.26%; */
`;

const Icon = styled.img``;

const Text = styled.span`
  /* position: absolute;
  width: 271px;
  height: 24px;
  left: 34px; */
  /* top: calc(50%-24px/2); */
  /* top: 35px; */

  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.3px;

  color: #fff;

  flex: none;
  order: 1;
  flex-grow: 1;
  margin: 0px 10px;
`;

export default NoticePage;
