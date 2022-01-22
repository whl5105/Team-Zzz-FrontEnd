import React from "react";
import styled from "styled-components";

import {diary_NoRecord} from "../../static/images/index";

const NoRecord = (props) => {
  return (
    <Wrap>
      <Image/>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 100vh;
`;

const Image = styled.div`
  width: 100%;
  height: inherit;
  background: url(${diary_NoRecord});
  background-size: 100%;
  background-position: 80;
  background-repeat: no-repeat;
`;

export default NoRecord;
