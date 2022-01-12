import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore.js";
import { withRouter } from "react-router-dom";

// --- components ---
import Icon from "../elements/Icon.js";
import MixListPopUp from "../pages/MixListPopUp.js";

// --- images ---
import Logo from "../static/images/header/logo.svg";
import Writing from "../static/images/header/writing.png";
import PlayList from "../static/images/header/playList.png";
import Hover from "../static/images/header/hover.png";

const Header = withRouter((props) => {
  const path = props.location.pathname;
  const [mixListModal, setMixListModal] = React.useState(false);

  const playListPopUp = () => {
    setMixListModal(true);
  };

  const closeModal = () => {
    setMixListModal(false);
  };

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
        {path === "/asmr" || path === "/asmrPop" ? (
          <>
            <HoverImage
              src={PlayList}
              alt="playList"
              position="absolute"
              right="23px"
              hoverImage={Hover}
              onClick={playListPopUp}
            />
            <img className="playListHover" alt=""></img>
          </>
        ) : (
          <Icon src={Writing} alt="writing" />
        )}
      </HeaderBox>

      {mixListModal && <MixListPopUp close={closeModal}></MixListPopUp>}
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

const HoverImage = styled.img`
  width: 24px;
  height: 24px;
  src: ${(props) => props.src};
  position: ${(props) => props.position};
  right: ${(props) => props.right};
  cursor: pointer;

  & + .playListHover {
    position: relative;
    width: 72px;
    right: 30px;
    height: 21.6px;
    background-image: url(${(props) => props.hoverImage});
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export default Header;
