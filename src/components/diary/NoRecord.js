import React from "react";
import styled from "styled-components";

// --- images ---
import NoInfo from "../../static/images/diary/NoInfo.png";
import Top from "../../static/images/diary/Top.png";
import Bottom from "../../static/images/diary/Bottom.png";

const NoRecord = (props) => {
  return (
    <Wrap>
      <Image></Image>
    </Wrap>
  );
};

// --- styled-components ---
const Wrap = styled.div`
  height: 100vh;
`;

const Image = styled.div`
  width: 100%;
  height: inherit;
  background: url(${Top}), url(${Bottom});
  background-size: 550px, 640px;
  background-position: 50% -10%, 54% 100%;
  background-repeat: no-repeat;
`;

export default NoRecord;
