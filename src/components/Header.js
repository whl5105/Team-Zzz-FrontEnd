import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore.js";
import { withRouter } from "react-router-dom";

// --- components ---
import Icon from "../elements/Icon.js";

// --- images ---
import Logo from "../static/images/header/logo.svg";
import Writing from "../static/images/header/writing.png";
import PlayList from "../static/images/header/playList.png";

const Header = withRouter((props) => {
  const path = props.location.pathname;

  return (
    <div>
      <HeaderBox>
        <img
          src={Logo}
          alt="logo"
          onClick={() => {
            history.push("/");
          }}
        />
        {path === "/asmr" ? (
          <Icon src={PlayList} alt="playList" position="relative" left="-2px" />
        ) : (
          <Icon src={Writing} alt="writing" />
        )}
      </HeaderBox>
    </div>
  );
});

const HeaderBox = styled.div`
  width: 100%;
  height: 50px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.bg};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 5;
`;

export default Header;
