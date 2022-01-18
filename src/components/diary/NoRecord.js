import React from "react";
import styled from "styled-components";

// --- images ---
import NoInfo from "../../static/images/diary/NoInfo.png";

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
<<<<<<< HEAD
  background: url(${NoRecord_R}), url(${NoRecord_B});
  /* background-size: 685px, 600px; */
  background-position: 50% 100%;
  background-size: 100%;

  /* background-position: 50% 100%, 49% 50%; */
  /* background-position: 0% 0%, 0%; */
=======
  background: url(${NoInfo});
  background-size: 100%;
  background-position: 100%;
>>>>>>> f5f8b15848efacdca86cc598e6b81fd98cbf2d38
  background-repeat: no-repeat;
`;

export default NoRecord;
