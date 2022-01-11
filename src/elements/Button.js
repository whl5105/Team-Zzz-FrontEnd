import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { type, text, _onClick, height, children, size, marginT } = props;

  const styles = { size: size, marginT: marginT };

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

  return <React.Fragment></React.Fragment>;
};

Button.defaultProps = {
  type: "bgBtn",
  text: false,
  children: null,
  _onClick: () => {},
};

const BgBtn = styled.button`
  width: 100%;
  height: ${(props) => (props.height ? ` ${props.height}px;` : "48px")};
  border-radius: 8px;
  border: transparent;
  background-color: ${({ theme }) => theme.colors.main_1};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${(props) => (props.size ? ` ${props.size}px;` : "14px")};
<<<<<<< HEAD
  margin-top: ${(props) => props.marginT && `${props.marginT}px`};
=======
  margin-top: ${(props) => props.marginT};
>>>>>>> b93cc6c0ea94da7549a873ef5d9831d8a62d4e59
`;

const BorderBtn = styled.button`
  width: 100%;
  background: transparent;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  color: ${({ theme }) => theme.colors.gray_7};
  font-size: ${(props) => (props.size ? ` ${props.size}px;` : "14px")};
  margin-top: ${(props) => props.marginT && `${props.marginT}px`};
`;

export default Button;
