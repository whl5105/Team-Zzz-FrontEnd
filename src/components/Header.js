import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore.js";
import { withRouter } from "react-router-dom";

// --- components ---
import Icon from "../elements/Icon.js";
import MixListPopUp from "../components/mixList/MixListPopUp";
import RequireLogin from "../components/RequireLogin";

// --- images ---
import Logo from "../static/images/header/logo.svg";
import Writing from "../static/images/header/writing.png";
import PlayList from "../static/images/header/playList.png";
import Hover from "../static/images/header/hover.png";

const Header = withRouter((props) => {
  const path = props.location.pathname;
  const [mixListModal, setMixListModal] = React.useState(false);
  const [requireLoginModal, setRequireLoginModal] = React.useState(false);

  const playListPopUp = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRequireLoginModal(true);
    } else {
      setMixListModal(true);
    }
  };

  const closeMixListModal = () => {
    setMixListModal(false);
    history.push({ pathname: "/", route: "/asmr" });
  };

  const closeRequireModal = () => {
    setRequireLoginModal(false);
  };

  const loginModal = () => {
    setRequireLoginModal(false);
    history.push("/login");
  };

  const PageLink = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSfdn7OIKJYKQLfzNScDvBSCvv07yH9cuyjORoNyE_GNHfaG_w/viewform?vc=0&c=0&w=1&flr=0",
      "_blank"
    );
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
              onClick={playListPopUp}
            />
            <Image src={Hover} className="playListHover" alt=""></Image>
          </>
        ) : (
          <Icon src={Writing} alt="writing" _onClick={PageLink} />
        )}
      </HeaderBox>
      {requireLoginModal ? (
        <RequireLogin
          close={closeRequireModal}
          move={loginModal}
        ></RequireLogin>
      ) : (
        mixListModal && (
          <MixListPopUp
            close={closeMixListModal}
            setMixListModal={setMixListModal}
          ></MixListPopUp>
        )
      )}
    </div>
  );
});

// --- styled-components ---
const HeaderBox = styled.div`
  width: 100%;
  height: 50px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.bg};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

const HoverImage = styled.img`
  width: 24px;
  height: 24px;
  src: ${(props) => props.src};
  position: ${(props) => props.position};
  right: ${(props) => props.right};
  cursor: pointer;
`;

const Image = styled.div`
  position: relative;
  width: 92px;
  height: 32px;
  right: 3px;
  top: 30px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Header;
