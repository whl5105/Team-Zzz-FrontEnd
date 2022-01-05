import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    resetInput,
    placeholder,
    onChange,
    onClick,
    name,
    value,
    type,
    src,
    alt,
  } = props;

  if (resetInput) {
    return (
      <>
        <InputGrop>
          <InputBox
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
          ></InputBox>
          <img src={src} alt={alt} name={name} onClick={onClick} />
        </InputGrop>
      </>
    );
  }

  return (
    <React.Fragment>
      {/* <Grid> */}
      <InputGrop>
        <InputBox
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        ></InputBox>
      </InputGrop>
      {/* </Grid> */}
    </React.Fragment>
  );
};

Input.defaultProps = {
  placeholder: "텍스트를 입력해주세요.",
  type: "",
  name: "",
  value: "",
  onChange: () => {},
  onClick: () => {},
};

const InputGrop = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.main_1};
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  /* &:nth-child(2) {
    margin-bottom: 20px;
  } */

  & img {
    width: 20px;
    padding-right: 20px;
  }
`;
const InputBox = styled.input`
  width: 100%;
  /* height: 60px; */
  padding: 0 1.25rem;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 0.875rem;
  border: none;
  &:focus {
    outline: none;
  }
`;
export default Input;
