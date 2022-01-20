import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { type, text, _onClick, children, size, marginT, bg, color } =
    props;

  const styles = { size: size, marginT: marginT, bg: bg, color: color };

  if (type === "boderBtn") {
    return (
      <BorderBtn {...styles} onClick={_onClick}>
        {text ? text : children}
      </BorderBtn>
    );
  }
  if (type === "bgBtn") {
    return (
      <BgBtn {...styles} onClick={_onClick}>
        {text ? text : children}
      </BgBtn>
    );
  }

  return <></>;
};

Button.defaultProps = {
  type: "bgBtn",
  text: false,
  children: null,
  _onClick: () => {},
};

// --- styled-components ---
const BgBtn = styled.button`
  width: 100%;
  height: ${(props) => (props.height ? ` ${props.height}px;` : "48px")};
  border-radius: 8px;
  border: transparent;
  background-color: ${({ theme }) => theme.colors.main_1};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${(props) => (props.size ? ` ${props.size}px;` : "14px")};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  margin-top: ${(props) => props.marginT && `${props.marginT}px`};
`;

const BorderBtn = styled.button`
  width: 100%;
  background: ${(props) => (props.bg ? `${props.bg}` : "transparent")};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  color: ${({ theme }) => theme.colors.gray_7};
  font-size: ${(props) => (props.size ? ` ${props.size}px;` : "14px")};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  margin-top: ${(props) => props.marginT && `${props.marginT}px`};
`;

export default Button;
