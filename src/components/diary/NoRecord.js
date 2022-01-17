import React from "react";
import styled from "styled-components";

// --- images ---
import NoRecord_B_1 from "../../static/images/diary/NoRecord_B_1.png";
import NoRecord_B_2 from "../../static/images/diary/NoRecord_B_2.png";
import NoRecord_B_3 from "../../static/images/diary/NoRecord_B_3.png";
import NoRecord_R from "../../static/images/diary/NoRecord_R.png";
import NoRecord_T from "../../static/images/diary/NoRecord_T.png";

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
  background: url(${NoRecord_T}), url(${NoRecord_B_1}), url(${NoRecord_B_2}),
    url(${NoRecord_B_3}), url(${NoRecord_R});
  background-size: 600px, 650px, 650px, 650px, 600px;
  background-position: 20% 50%, 0% 80%, 0% 80%, 0% 80%, 150% 72%;
  background-repeat: no-repeat; ;
`;

export default NoRecord;
