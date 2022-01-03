import React from "react";
import styled from "styled-components";

import Logo from "../static/images/header/logo.svg";
import Writing from "../static/images/header/writing.svg";

const Header = (props) => {
  return (
    <div>
      <HeaderBox>
        <img src={Logo} alt="logo" />
        <img src={Writing} alt="writing" />
      </HeaderBox>
    </div>
  );
};
const HeaderBox = styled.div`
  width: 100%;
  height: 50px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.bg};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

export default Header;
