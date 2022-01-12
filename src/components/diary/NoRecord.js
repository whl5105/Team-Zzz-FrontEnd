import React from "react";
import styled from "styled-components";

// --- images ---
import NoInfo from "../../static/images/diary/NoInfo.png";

const NoRecord = (props) => {
  return (
    <>
      <Wrap>
        <Image></Image>
      </Wrap>
    </>
  );
};

// --- styled-components ---
const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

const Image = styled.div`
  position: relative;
  height: 100%;
  margin-top: 20px;
  background-image: url(${NoInfo});
  background-repeat: no-repeat;
  background-size: 100%;
  bottom: 0;
`;

export default NoRecord;
